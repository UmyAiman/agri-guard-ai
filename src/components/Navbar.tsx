import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, ChevronDown, Shield } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/auth/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const userLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/detect", label: "Detect Disease" },
    { to: "/chat", label: "Chat Assistant" },
    { to: "/profile", label: "Profile" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Admin Dashboard" },
    { to: "/admin/add-disease", label: "Add Disease" },
    { to: "/admin/manage-diseases", label: "Manage Diseases" },
    { to: "/admin/upload-documents", label: "Upload Documents" },
    { to: "/admin/detection-logs", label: "Detection Logs" },
  ];

  const isAdminActive = location.pathname.startsWith("/admin");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg btn-glow flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">Agri Guard</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {userLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === l.to
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {l.label}
              </Link>
            ))}

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                onBlur={() => setTimeout(() => setAdminOpen(false), 150)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1",
                  isAdminActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", adminOpen && "rotate-180")} />
              </button>
              {adminOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl glass-strong border border-border/50 p-2 space-y-1 shadow-lg">
                  {adminLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setAdminOpen(false)}
                      className={cn(
                        "block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        location.pathname === l.to
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <button
                type="button"
                onClick={() => logout()}
                className="ml-4 px-4 py-2 rounded-lg btn-glow text-sm font-semibold text-accent-foreground"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="ml-4 px-4 py-2 rounded-lg btn-glow text-sm font-semibold text-accent-foreground">
                Login
              </Link>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-border/50 p-4 space-y-2">
          {userLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-border/30 pt-2 mt-2">
            <p className="px-4 py-1 text-xs font-semibold text-primary flex items-center gap-1">
              <Shield className="w-3 h-3" /> Admin
            </p>
            {adminLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                {l.label}
              </Link>
            ))}
          </div>
          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-primary"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2 rounded-lg text-sm font-medium text-primary">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
