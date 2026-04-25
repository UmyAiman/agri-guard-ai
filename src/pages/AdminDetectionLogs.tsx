import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import GlassCard from "@/components/GlassCard";

const logs = [
  { id: 1, date: "Feb 21, 2026", input: "Image", disease: "Tomato Early Blight", confidence: "96%", source: "Neural Net v3" },
  { id: 2, date: "Feb 21, 2026", input: "Text", disease: "Rice Blast", confidence: "89%", source: "NLP Engine" },
  { id: 3, date: "Feb 20, 2026", input: "Voice", disease: "Wheat Rust", confidence: "92%", source: "Voice + NLP" },
  { id: 4, date: "Feb 20, 2026", input: "Image", disease: "Corn Smut", confidence: "88%", source: "Neural Net v3" },
  { id: 5, date: "Feb 19, 2026", input: "Image", disease: "Citrus Canker", confidence: "94%", source: "Neural Net v3" },
  { id: 6, date: "Feb 19, 2026", input: "Text", disease: "Potato Late Blight", confidence: "91%", source: "NLP Engine" },
];

const AdminDetectionLogs = () => {
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Detection Logs</h1>
        <p className="text-muted-foreground mb-8">View all disease detection history</p>

        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  {["Date", "Input Type", "Predicted Disease", "Confidence", "Source"].map((h) => (
                    <th key={h} className="text-left text-xs font-medium text-muted-foreground pb-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-border/20 last:border-0">
                    <td className="py-3 text-sm text-foreground">{log.date}</td>
                    <td className="py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{log.input}</span>
                    </td>
                    <td className="py-3 text-sm text-foreground">{log.disease}</td>
                    <td className="py-3 text-sm text-primary font-medium">{log.confidence}</td>
                    <td className="py-3 text-xs text-muted-foreground">{log.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDetectionLogs;
