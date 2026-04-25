import { Search, Edit, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import GlassCard from "@/components/GlassCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminFetchDiseases, adminDeleteDisease } from "@/lib/api";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "sonner";
import { useState } from "react";

const AdminManageDiseases = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedDisease, setSelectedDisease] = useState<any | null>(null);

  const { data: diseases = [], isLoading } = useQuery({
    queryKey: ["admin-diseases", token],
    queryFn: () => adminFetchDiseases(token),
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminDeleteDisease(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-diseases"] });
      toast.success("Disease deleted");
    },
    onError: () => toast.error("Failed to delete disease"),
  });

  const filteredDiseases = diseases.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.scientificName?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">Manage Diseases</h1>
        <p className="text-muted-foreground mb-8">View, edit, and manage all disease entries</p>

        <GlassCard>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-input/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Search diseases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3">Disease</th>
                  <th className="text-left text-xs font-medium text-muted-foreground pb-3">Crop</th>
                  <th className="text-right text-xs font-medium text-muted-foreground pb-3">Actions</th>
                </tr>
              </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan={3} className="py-8 text-center text-muted-foreground animate-pulse">Loading diseases...</td></tr>
                  ) : filteredDiseases.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-muted-foreground">No diseases found.</td></tr>
                  ) : (
                    filteredDiseases.map((d: any) => (
                      <tr key={d._id} className="border-b border-border/20 last:border-0">
                        <td className="py-4 text-sm text-foreground font-medium">
                          {d.name}
                          <p className="text-xs text-muted-foreground font-normal italic">{d.scientificName}</p>
                        </td>
                        <td className="py-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{d.crop || "General"}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setSelectedDisease(d)}
                              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover-neon"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this disease?")) {
                                  deleteMutation.mutate(d._id);
                                }
                              }}
                              disabled={deleteMutation.isPending}
                              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-destructive hover-neon disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl"
          >
            <GlassCard neon>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedDisease.name}</h2>
                  <p className="text-primary text-sm font-medium">Verified Disease Record</p>
                </div>
                <button 
                  onClick={() => setSelectedDisease(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Eye className="w-5 h-5 rotate-45" />
                </button>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Major Symptoms</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    {selectedDisease.symptoms?.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    )) || <li>No symptoms listed</li>}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <h3 className="text-sm font-semibold text-green-500 mb-2">Organic Treatment</h3>
                    <p className="text-sm text-foreground">{selectedDisease.treatment?.organic || "N/A"}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                    <h3 className="text-sm font-semibold text-blue-500 mb-2">Chemical Treatment</h3>
                    <p className="text-sm text-foreground">{selectedDisease.treatment?.chemical || "N/A"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Prevention Steps</h3>
                  <ul className="list-disc list-inside space-y-1 text-foreground">
                    {selectedDisease.prevention?.map((p: string, i: number) => (
                      <li key={i}>{p}</li>
                    )) || <li>No prevention steps listed</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setSelectedDisease(null)}
                  className="px-6 py-2 rounded-xl btn-glow text-accent-foreground text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminManageDiseases;
