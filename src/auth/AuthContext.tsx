import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { AuthResponse, AuthUser, Role } from "./authTypes";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  loading: boolean;
  loginUser(email: string, password: string): Promise<void>;
  loginAdmin(email: string, password: string): Promise<void>;
  signupUser(name: string, email: string, password: string): Promise<void>;
  signupAdmin(name: string, email: string, password: string, adminKey: string): Promise<void>;
  logout(): void;
  refreshMe(): Promise<void>;
};

const TOKEN_KEY = "agri_guard_token";

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const persistToken = (t: string | null) => {
    setToken(t);
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  };

  const refreshMe = async () => {
    if (!token) {
      setUser(null);
      return;
    }
    const res = await apiFetch<{ user: AuthUser }>("/auth/me", { token });
    setUser(res.user);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refreshMe();
      } catch {
        if (!cancelled) {
          persistToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAuth = (resp: AuthResponse) => {
    persistToken(resp.token);
    setUser(resp.user);
  };

  const loginUser = async (email: string, password: string) => {
    const resp = await apiFetch<AuthResponse>("/auth/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuth(resp);
  };

  const loginAdmin = async (email: string, password: string) => {
    const resp = await apiFetch<AuthResponse>("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuth(resp);
  };

  const signupUser = async (name: string, email: string, password: string) => {
    const resp = await apiFetch<AuthResponse>("/auth/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    setAuth(resp);
  };

  const signupAdmin = async (name: string, email: string, password: string, adminKey: string) => {
    const resp = await apiFetch<AuthResponse>("/auth/admin/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, adminKey }),
    });
    setAuth(resp);
  };

  const logout = () => {
    persistToken(null);
    setUser(null);
  };

  const value = useMemo<AuthState>(() => {
    return {
      token,
      user,
      loading,
      loginUser,
      loginAdmin,
      signupUser,
      signupAdmin,
      logout,
      refreshMe,
    };
  }, [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useRequireRole(role: Role) {
  const { user } = useAuth();
  return user?.role === role;
}

