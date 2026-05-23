import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bug, Microscope, Pill, Shield, ExternalLink, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import GlassCard from "@/components/GlassCard";
import { cn } from "@/lib/utils";

const sections = [
  {
    icon: Bug,
    title: "Symptoms",
    items: [
      "Dark brown spots on upper leaf surface",
      "Yellow halo surrounding lesions",
      "Wilting of lower leaves first",
      "Premature leaf drop in severe cases",
    ],
  },
  {
    icon: Microscope,
    title: "Causes",
    items: [
      "Fungal pathogen Alternaria solani",
      "Spread through wind and rain splash",
      "Thrives in warm, humid conditions (24-29°C)",
      "Overwinters in infected plant debris",
    ],
  },
  {
    icon: Pill,
    title: "Treatment",
    items: [
      "Apply chlorothalonil-based fungicide",
      "Remove and destroy infected leaves",
      "Apply copper-based organic spray",
      "Ensure proper plant spacing for airflow",
    ],
  },
  {
    icon: Shield,
    title: "Prevention",
    items: [
      "Practice 3-year crop rotation",
      "Use disease-resistant varieties",
      "Mulch around plant base",
      "Avoid overhead watering",
    ],
  },
];

const DetectionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detectionData = location.state?.detection;

  useEffect(() => {
    if (!detectionData) {
      navigate("/detect");
    }
  }, [detectionData, navigate]);

  if (!detectionData) return null;

  const { result, info, demoMode } = detectionData;
  const isHealthy = result.status === "healthy";
  const confidencePercent = Math.round(result.confidence * 100);

  const gemini = result.geminiAnalysis;

  const dynamicSections = [
    {
      icon: Bug,
      title: "Symptoms",
      items: (info?.symptoms?.length > 0 ? info.symptoms : gemini?.symptoms) || ["No specific symptoms documented."],
    },
    {
      icon: Pill,
      title: "Treatment",
      items: [
        (info?.treatment?.organic || gemini?.treatment?.organic) && `Organic: ${info?.treatment?.organic || gemini?.treatment?.organic}`,
        (info?.treatment?.chemical || gemini?.treatment?.chemical) && `Chemical: ${info?.treatment?.chemical || gemini?.treatment?.chemical}`,
      ].filter(Boolean),
    },
    {
      icon: Shield,
      title: "Prevention",
      items: (info?.prevention?.length > 0 ? info.prevention : gemini?.prevention) || ["General plant care recommended."],
    },
  ].filter(s => s.items.length > 0);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header Result Card */}
          <GlassCard neon className="mb-8 text-center">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
              isHealthy ? "bg-green-500/10" : "bg-primary/10"
            )}>
              {isHealthy ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : <Bug className="w-8 h-8 text-primary" />}
            </div>
                <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                  {result.diseaseName}
                  {result.urduName && (
                    <span className="block text-primary text-2xl mt-1 font-normal UrduFont">
                      ({result.urduName})
                    </span>
                  )}
                </h2>
                <p className="text-muted-foreground text-sm italic mb-6">
                  Scientific Name: {result.scientificName || "N/A"}
                </p>
            <p className="text-muted-foreground mb-4">
              {isHealthy ? "Your plant appears to be healthy." : gemini?.description || `${result.diseaseName} detected in sample`}
            </p>
            
            {demoMode && (
              <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium mb-6">
                Demo Mode: Results may be simulated
              </div>
            )}

            {/* Confidence */}
            {!isHealthy && (
              <div className="max-w-sm mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="text-primary font-semibold">{confidencePercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidencePercent}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full btn-glow"
                  />
                </div>
              </div>
            )}
          </GlassCard>

          {/* Detail Sections */}
          {!isHealthy && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {dynamicSections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item: string) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Source */}
          <GlassCard className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>
                {info || result.analysis?.source === "database" 
                  ? "Source: Agri Guard Verified Agricultural Database" 
                  : "Source: Advanced AI Analysis (Verified Insights)"}
              </span>
            </div>
          </GlassCard>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/chat" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-glow font-semibold text-accent-foreground text-sm">
              <MessageSquare className="w-4 h-4" /> Ask Chat Assistant
            </Link>
            <Link to="/detect" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover-neon font-medium text-foreground text-sm">
              Detect Another <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DetectionResult;
