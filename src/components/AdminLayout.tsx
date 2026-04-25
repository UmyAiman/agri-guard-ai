import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, LayoutDashboard, Plus, Database, FileUp, ClipboardList, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mobileLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/add-disease", label: "Add Disease", icon: Plus },
  { to: "/admin/manage-diseases", label: "Manage", icon: Database },
  { to: "/admin/upload-documents", label: "Upload", icon: FileUp },
  { to: "/admin/detection-logs", label: "Logs", icon: ClipboardList },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden glass-strong border-b border-border/30 p-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg btn-glow flex items-center justify-center">
              <Leaf className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-foreground text-sm">Admin</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden glass-strong border-b border-border/30 p-4 space-y-1">
            {mobileLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg text-sm",
                  location.pathname === l.to ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                <l.icon className="w-4 h-4" />
                {l.label}
              </Link>
            ))}
            <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-destructive">
              <LogOut className="w-4 h-4" /> Logout
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
