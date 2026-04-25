import { Link, useNavigate } from "react-router-dom";
import { Leaf, Mail, Lock, KeyRound } from "lucide-react";
import { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/auth/AuthContext";
import { ApiError } from "@/lib/api";

const AdminSignup = () => {
  const navigate = useNavigate();
  const { signupAdmin } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", adminKey: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signupAdmin(form.name, form.email, form.password, form.adminKey);
      navigate("/admin/dashboard");
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-hero relative">
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-sky/5 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg btn-glow flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Agri Guard</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Registration</h1>
          <p className="text-sm text-muted-foreground mt-1">Create an admin account</p>
        </div>

        <GlassCard neon>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {[
              { label: "Name", icon: Leaf, type: "text", key: "name" as const, placeholder: "Admin Name" },
              { label: "Email", icon: Mail, type: "email", key: "email" as const, placeholder: "admin@agriguard.com" },
              { label: "Password", icon: Lock, type: "password", key: "password" as const, placeholder: "••••••••" },
              { label: "Admin Key", icon: KeyRound, type: "password", key: "adminKey" as const, placeholder: "Enter admin secret key" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    minLength={field.key === "password" ? 8 : undefined}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm disabled:opacity-70"
            >
              {submitting ? "Creating..." : "Create Admin Account"}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already registered?{" "}
            <Link to="/admin/login" className="text-primary hover:underline">Admin Login</Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminSignup;
