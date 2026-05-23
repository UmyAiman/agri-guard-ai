import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, FileText, Mic, Upload, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { analyzePlant } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "sonner";

const DetectDisease = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { token } = useAuth();

  const handleFileChange = (file: File) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      toast.error("Please provide an image");
      return;
    }

    setLoading(true);
    try {
      const data = await analyzePlant(selectedFile, "", token);
      navigate("/result", { state: { detection: data } });
    } catch (err: any) {
      toast.error(err.message || "Detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Disease Detection</h1>
          <p className="text-muted-foreground mb-8">Upload a plant image for instant AI analysis</p>

          <AnimatePresence mode="wait">
            {/* Loading overlay */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
              >
                <GlassCard neon className="text-center p-12">
                  <div className="w-20 h-20 rounded-full btn-glow flex items-center justify-center mx-auto mb-6 pulse-glow">
                    <Loader2 className="w-10 h-10 text-accent-foreground animate-spin" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2">AI Analyzing...</h2>
                  <p className="text-sm text-muted-foreground">Processing your image with our neural network</p>
                </GlassCard>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard neon>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300",
                    dragActive ? "border-primary bg-primary/5" : "border-border/50"
                  )}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Drag & Drop your plant image
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="file-upload" 
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2.5 rounded-xl glass hover-neon text-sm font-medium text-foreground cursor-pointer"
                  >
                    {selectedFile ? "Change Image" : "Browse Files"}
                  </label>
                  {preview && (
                    <div className="mt-4 max-w-xs mx-auto rounded-xl overflow-hidden border border-border/50">
                      <img src={preview} alt="Preview" className="w-full h-auto" />
                    </div>
                  )}
                </div>
                <button onClick={handleDetect} className="w-full mt-6 py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm">
                  Detect Disease
                </button>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default DetectDisease;
