export type ApiErrorBody = { error?: string };

export class ApiError extends Error {
  status: number;
  body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function getBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return (base ?? "http://localhost:5000/api").replace(/\/+$/, "");
}

export async function apiFetch<T>(path: string, init?: RequestInit & { token?: string | null }): Promise<T> {
  const url = `${getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = new Headers(init?.headers);
  headers.set("accept", "application/json");

  const token = init?.token;
  if (token) headers.set("authorization", `Bearer ${token}`);

  const body = init?.body;
  if (body && !(body instanceof FormData)) {
    if (!headers.has("content-type")) headers.set("content-type", "application/json");
  }

  const res = await fetch(url, { ...init, headers });
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && "error" in (payload as ApiErrorBody) && (payload as ApiErrorBody).error) ||
      `Request failed (${res.status})`;
    console.error(`API Error [${res.status}] ${url}:`, payload);
    throw new ApiError(String(msg), res.status, payload);
  }

  return payload as T;
}

export async function analyzePlant(image: File | null, textInput?: string, token?: string | null) {
  const formData = new FormData();
  if (image) formData.append("image", image);
  if (textInput) formData.append("textInput", textInput);

  return apiFetch<{ result: any; info: any; historyId: string; demoMode?: boolean }>("/detection/analyze", {
    method: "POST",
    body: formData,
    token,
  });
}

export async function sendChatMessage(message: string, token?: string | null) {
  return apiFetch<{ response: string }>("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
    token,
  });
}

export async function fetchHistory(token?: string | null) {
  return apiFetch<any[]>("/detection/history", {
    method: "GET",
    token,
  });
}

// Admin API helpers
export async function adminFetchDiseases(token?: string | null) {
  return apiFetch<any[]>("/admin/diseases", {
    method: "GET",
    token,
  });
}

export async function adminCreateDisease(diseaseData: any, token?: string | null) {
  return apiFetch<any>("/admin/diseases", {
    method: "POST",
    body: JSON.stringify(diseaseData),
    token,
  });
}

export async function adminUpdateDisease(id: string, diseaseData: any, token?: string | null) {
  return apiFetch<any>(`/admin/diseases/${id}`, {
    method: "PUT",
    body: JSON.stringify(diseaseData),
    token,
  });
}

export async function adminDeleteDisease(id: string, token?: string | null) {
  return apiFetch<any>(`/admin/diseases/${id}`, {
    method: "DELETE",
    token,
  });
}

