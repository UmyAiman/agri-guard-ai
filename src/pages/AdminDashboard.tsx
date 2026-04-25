import { BarChart3, Database, FileText, Activity, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import GlassCard from "@/components/GlassCard";

const stats = [
  { label: "Total Diseases", value: "247", icon: Database, change: "+12 this month" },
  { label: "Total Documents", value: "1,834", icon: FileText, change: "+89 this month" },
  { label: "Total Detections", value: "15,429", icon: BarChart3, change: "+2,341 this month" },
  { label: "API Status", value: "Online", icon: Activity, change: "99.9% uptime" },
];

const chartData = [
  { month: "Sep", detections: 1200 },
  { month: "Oct", detections: 1800 },
  { month: "Nov", detections: 2100 },
  { month: "Dec", detections: 1900 },
  { month: "Jan", detections: 2800 },
  { month: "Feb", detections: 3400 },
];

const AdminDashboard = () => {
  const maxVal = Math.max(...chartData.map((d) => d.detections));

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">System overview and analytics</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                <p className="text-xs text-primary mt-2">{stat.change}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Chart */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Detection Trends</h2>
          </div>
          <div className="flex items-end gap-4 h-48">
            {chartData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-primary font-medium">{d.detections}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.detections / maxVal) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full rounded-t-lg btn-glow min-h-[4px]"
                />
                <span className="text-xs text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent */}
        <GlassCard className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {["New disease 'Citrus Canker' added", "Document uploaded: Wheat Disease Guide 2026", "1,247 detections processed today", "API health check passed"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
