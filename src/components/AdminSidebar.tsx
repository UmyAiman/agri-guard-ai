import { Link, useLocation } from "react-router-dom";
import { Leaf, LayoutDashboard, Plus, Database, FileUp, ClipboardList, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/add-disease", label: "Add Disease", icon: Plus },
  { to: "/admin/manage-diseases", label: "Manage Diseases", icon: Database },
  { to: "/admin/upload-documents", label: "Upload Documents", icon: FileUp },
  { to: "/admin/detection-logs", label: "Detection Logs", icon: ClipboardList },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen glass-strong border-r border-border/30">
      <div className="p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg btn-glow flex items-center justify-center">
            <Leaf className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <span className="font-display font-bold text-foreground">Agri Guard</span>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {adminLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              location.pathname === l.to
                ? "bg-primary/20 text-primary neon-glow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <l.icon className="w-4 h-4" />
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <Link
          to="/admin/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
