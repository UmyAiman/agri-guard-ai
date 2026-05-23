import { User, Mail, Calendar, LogOut, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { useAuth } from "@/auth/AuthContext";
import { format } from "date-fns";

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard neon className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 neon-glow-sm">
              <User className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-1">{user?.name || "Farmer"}</h1>
            <p className="text-sm text-muted-foreground mb-8">{user?.role === 'admin' ? 'Administrator' : 'Farmer Account'}</p>

            <div className="space-y-4 max-w-sm mx-auto text-left">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
                <User className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm text-foreground font-medium">{user?.name || "Not available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground font-medium">{user?.email || "Not available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Account Created</p>
                  <p className="text-sm text-foreground font-medium">
                    {user?.createdAt ? format(new Date(user.createdAt), "MMMM dd, yyyy") : "Recently"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-sm mx-auto">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover-neon font-medium text-foreground text-sm">
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
              <button 
                onClick={() => logout()}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/20 transition-all"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
};

export default UserProfile;
