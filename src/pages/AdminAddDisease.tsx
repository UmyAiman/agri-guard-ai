import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import GlassCard from "@/components/GlassCard";
import { adminCreateDisease } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminAddDisease = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomInput, setSymptomInput] = useState("");
  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    description: "",
    organicTreatment: "",
    chemicalTreatment: "",
    prevention: "",
    crop: "",
  });

  const addSymptom = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.length === 0) return toast.error("Please add at least one symptom");

    setLoading(true);
    try {
      await adminCreateDisease({
        name: form.name,
        scientificName: form.scientificName,
        description: form.description,
        symptoms,
        treatment: {
          organic: form.organicTreatment,
          chemical: form.chemicalTreatment,
        },
        prevention: form.prevention.split("\n").filter(p => p.trim()),
        crop: form.crop,
      }, token);
      
      toast.success("Disease added successfully");
      navigate("/admin/manage-diseases");
    } catch (err: any) {
      toast.error(err.message || "Failed to add disease");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Add Disease</h1>
        <p className="text-muted-foreground mb-8">Register a new disease entry in the database</p>

        <GlassCard neon className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Disease Name</label>
              <input 
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                placeholder="e.g. Tomato Early Blight" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Scientific Name</label>
              <input 
                value={form.scientificName}
                onChange={(e) => setForm({ ...form, scientificName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                placeholder="e.g. Alternaria solani" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Crop (e.g. Wheat, Rice, Cotton)</label>
              <input 
                required
                value={form.crop}
                onChange={(e) => setForm({ ...form, crop: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                placeholder="e.g. Wheat" 
              />
            </div>

            {/* Symptoms multi-tag */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Symptoms</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {symptoms.map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    {s}
                    <button type="button" onClick={() => setSymptoms(symptoms.filter((_, idx) => idx !== i))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSymptom())}
                  className="flex-1 px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Add a symptom and press Enter"
                />
                <button type="button" onClick={addSymptom} className="px-4 py-3 rounded-xl glass hover-neon">
                  <Plus className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
              <textarea 
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3} 
                className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all" 
                placeholder="Describe the disease..." 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Organic Treatment</label>
                <textarea 
                  value={form.organicTreatment}
                  onChange={(e) => setForm({ ...form, organicTreatment: e.target.value })}
                  rows={3} 
                  className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all" 
                  placeholder="Organic remedies..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Chemical Treatment</label>
                <textarea 
                  value={form.chemicalTreatment}
                  onChange={(e) => setForm({ ...form, chemicalTreatment: e.target.value })}
                  rows={3} 
                  className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all" 
                  placeholder="Chemical remedies..." 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Prevention (one per line)</label>
              <textarea 
                value={form.prevention}
                onChange={(e) => setForm({ ...form, prevention: e.target.value })}
                rows={3} 
                className="w-full px-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all" 
                placeholder="Prevention steps..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save Disease"}
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAddDisease;
