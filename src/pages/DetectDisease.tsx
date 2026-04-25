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

const tabs = [
  { id: "image", label: "Image Upload", icon: Camera },
  { id: "text", label: "Text Input", icon: FileText },
  { id: "voice", label: "Voice Input", icon: Mic },
];

const DetectDisease = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("image");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState("");
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
    if (!selectedFile && !textInput.trim()) {
      toast.error("Please provide an image or description");
      return;
    }

    setLoading(true);
    try {
      const data = await analyzePlant(selectedFile, textInput, token);
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
          <p className="text-muted-foreground mb-8">Choose your input method to analyze plant health</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                  activeTab === tab.id
                    ? "btn-glow text-accent-foreground neon-glow-sm"
                    : "glass text-muted-foreground hover:text-foreground hover-neon"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

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
                  <p className="text-sm text-muted-foreground">Processing your input with our neural network</p>
                </GlassCard>
              </motion.div>
            )}

            {/* Image Tab */}
            {activeTab === "image" && (
              <motion.div key="image" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
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
            )}

            {/* Text Tab */}
            {activeTab === "text" && (
              <motion.div key="text" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard neon>
                  <label className="block text-sm font-medium text-foreground mb-2">Describe the symptoms</label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={6}
                    className="w-full p-4 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all"
                    placeholder="e.g. The leaves on my tomato plant have brown spots with yellow rings around them. The lower leaves are wilting..."
                  />
                  <button onClick={handleDetect} className="w-full mt-6 py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm">
                    Analyze Symptoms
                  </button>
                </GlassCard>
              </motion.div>
            )}

            {/* Voice Tab */}
            {activeTab === "voice" && (
              <motion.div key="voice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard neon className="text-center">
                  <div className="py-8">
                    <button
                      onClick={() => setRecording(!recording)}
                      className={cn(
                        "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300",
                        recording
                          ? "bg-destructive/20 border-2 border-destructive pulse-glow"
                          : "btn-glow"
                      )}
                    >
                      <Mic className={cn("w-10 h-10", recording ? "text-destructive" : "text-accent-foreground")} />
                    </button>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {recording ? "Recording... Tap to stop" : "Tap to start recording"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Describe the plant symptoms in your own words
                    </p>

                    {recording && (
                      <div className="glass rounded-xl p-4 max-w-md mx-auto mb-6">
                        <p className="text-sm text-foreground italic">"The leaves on my crop are turning yellow with dark spots..."</p>
                      </div>
                    )}

                    <button onClick={handleDetect} className="px-8 py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm">
                      Analyze Voice Input
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default DetectDisease;
