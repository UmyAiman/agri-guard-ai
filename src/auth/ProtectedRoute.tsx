import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { Role } from "./authTypes";

export default function ProtectedRoute({ role, redirectTo }: { role?: Role; redirectTo?: string }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to={redirectTo ?? "/login"} replace />;
  if (role && user.role !== role) return <Navigate to={redirectTo ?? "/"} replace />;

  return <Outlet />;
}

