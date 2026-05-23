import { Link } from "react-router-dom";
import { Camera, Mic, FileText, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { format } from "date-fns";

const quickActions = [
  { icon: Camera, title: "Detect via Image", desc: "Upload or capture a plant photo", to: "/detect?tab=image", color: "text-primary" },
  { icon: FileText, title: "AI Chat Assistant", desc: "Talk with AI about symptoms", to: "/chat", color: "text-gold" },
];

const UserDashboard = () => {
  const { token, user } = useAuth();
  
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["history", token],
    queryFn: () => fetchHistory(token),
    enabled: !!token,
  });
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <GlassCard neon className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Welcome back, <span className="text-gradient">{user?.name || "Farmer"}</span>
                </h1>
                <p className="text-muted-foreground mt-1">Ready to diagnose your crops today?</p>
              </div>
              <Link to="/detect" className="px-6 py-3 rounded-xl btn-glow text-sm font-semibold text-accent-foreground inline-flex items-center gap-2">
                Start Detection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            >
              <Link to={action.to}>
                <GlassCard hover className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
                    <action.icon className={`w-7 h-7 ${action.color}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.desc}</p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <GlassCard>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-display text-lg font-semibold text-foreground">Recent Detection History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Input Type</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Disease</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3">Confidence</th>
                    <th className="text-left text-xs font-medium text-muted-foreground pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={5} className="py-8 text-center text-muted-foreground animate-pulse">Loading history...</td></tr>
                  ) : history.length === 0 ? (
                    <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No detection history found.</td></tr>
                  ) : (
                    history.map((h: any) => (
                      <tr key={h._id} className="border-b border-border/20 last:border-0">
                        <td className="py-3 text-sm text-foreground">{format(new Date(h.createdAt), "MMM dd, yyyy")}</td>
                        <td className="py-3">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {h.imageUrl === "text_input" ? "Text" : "Image"}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-foreground">{h.diseaseName}</td>
                        <td className="py-3 text-sm text-primary font-medium">{Math.round(h.confidence * 100)}%</td>
                        <td className="py-3">
                          <span className="text-xs text-muted-foreground italic">Saved</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
};

export default UserDashboard;
