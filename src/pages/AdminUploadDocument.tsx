import { Upload, FileText } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import GlassCard from "@/components/GlassCard";

const AdminUploadDocument = () => {
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Upload Document</h1>
        <p className="text-muted-foreground mb-8">Upload government-verified agricultural documents</p>

        <GlassCard neon className="max-w-2xl">
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Document Title</label>
              <input className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. Wheat Disease Management Guide 2026" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Related Crop</label>
              <input className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. Wheat" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Upload PDF</label>
              <div className="border-2 border-dashed border-border/50 rounded-2xl p-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium mb-1">Drag & drop your PDF here</p>
                <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
                <input type="file" accept=".pdf" className="hidden" id="doc-upload" />
                <label htmlFor="doc-upload" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl glass hover-neon text-sm text-foreground cursor-pointer">
                  <FileText className="w-4 h-4" /> Choose File
                </label>
              </div>
            </div>

            <button type="button" className="w-full py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm">
              Upload Document
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUploadDocument;
