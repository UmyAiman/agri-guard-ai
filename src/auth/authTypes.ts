export type Role = "user" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

