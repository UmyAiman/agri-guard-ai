import { Link } from "react-router-dom";
import { Camera, Mic, FileText, ShieldCheck, Cpu, Globe, Lock, ArrowRight, Leaf, ChevronRight, Users, Target, Heart, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import heroFarmer from "@/assets/hero-farmer.jpg";
import featuresPlant from "@/assets/features-plant.jpg";
import aboutFarm from "@/assets/about-farm.jpg";
import howItWorks from "@/assets/how-it-works.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const features = [
  { icon: Camera, title: "Image Upload", desc: "Upload or capture plant photos for instant AI diagnosis" },
  { icon: Cpu, title: "AI Detection", desc: "Advanced deep learning models trained on millions of samples" },
  { icon: ShieldCheck, title: "Gov Verified Data", desc: "Treatment plans backed by government agricultural databases" },
  { icon: Globe, title: "Multilingual Chat", desc: "Get assistance in your local language with AI chat" },
  { icon: FileText, title: "Prevention Guide", desc: "Detailed prevention and care instructions for every crop" },
  { icon: Lock, title: "Secure System", desc: "Enterprise-grade security for all your farm data" },
];

const steps = [
  { num: "01", title: "Upload Image", desc: "Capture or upload an image of the diseased plant" },
  { num: "02", title: "AI Analysis", desc: "Our neural network processes and identifies the disease" },
  { num: "03", title: "Database Match", desc: "Cross-referenced with verified agricultural databases" },
  { num: "04", title: "Treatment Plan", desc: "Receive detailed treatment and prevention guide" },
];

const stats = [
  { value: "50+", label: "Crop Diseases" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "10K+", label: "Farmers Helped" },
  { value: "24/7", label: "AI Assistance" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg btn-glow flex items-center justify-center">
              <Leaf className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">Agri Guard</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2 rounded-lg btn-glow text-sm font-semibold text-accent-foreground">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero - 2 Grid */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeLeft}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-8">
              <Cpu className="w-4 h-4" />
              Powered by Advanced AI
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered Smart
              <br />
              <span className="text-gradient">Plant Disease Detection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10">
              Detect plant diseases instantly using image analysis or text input.
              Get verified treatment plans backed by government databases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-glow text-base font-semibold text-accent-foreground">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass hover-neon text-base font-medium text-foreground">
                Login to Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 mt-12">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div initial="hidden" animate="visible" variants={fadeRight} className="relative">
            <div className="relative rounded-3xl overflow-hidden neon-border">
              <img src={heroFarmer} alt="Farmer using AI technology in field" className="w-full h-auto rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating cards on image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 floating"
            >
              <GlassCard className="py-3 px-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Image Scan</p>
                  <p className="text-xs text-muted-foreground">Instant diagnosis</p>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -top-4 -right-4 floating-delayed"
            >
              <GlassCard className="py-3 px-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">95% Accurate</p>
                  <p className="text-xs text-muted-foreground">AI powered</p>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - 2 Grid: Image left, cards right */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <div className="relative rounded-3xl overflow-hidden neon-glow-sm">
                <img src={featuresPlant} alt="AI scanning diseased plant leaf" className="w-full h-auto rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything You Need for
                <span className="text-gradient"> Smart Farming</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-8">
                A complete AI-powered platform for agricultural disease management, built for modern farmers.
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <motion.div key={f.title} variants={fadeUp} custom={i + 2}>
                    <GlassCard hover className="h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                        <f.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-sm mb-1">{f.title}</h3>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works - 2 Grid: Content left, image right */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It <span className="text-gradient">Works</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground mb-10">
                Four simple steps to diagnose and treat plant diseases with AI precision.
              </motion.p>
              <div className="space-y-6">
                {steps.map((step, i) => (
                  <motion.div key={step.num} variants={fadeUp} custom={i + 2} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl btn-glow flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-sm text-accent-foreground">{step.num}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
              <div className="relative rounded-3xl overflow-hidden neon-glow-sm">
                <img src={howItWorks} alt="Scientist analyzing plant samples with AI" className="w-full h-auto rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tl from-background/50 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <div className="relative rounded-3xl overflow-hidden neon-glow-sm">
                <img src={aboutFarm} alt="Smart farming with drone technology" className="w-full h-auto rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary mb-6">
                <Sprout className="w-4 h-4" />
                About Us
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Empowering Farmers with <span className="text-gradient">AI Technology</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-6">
                Agri Guard is a university-driven research project dedicated to revolutionizing agriculture through artificial intelligence. We combine cutting-edge deep learning with verified government agricultural databases to bring precision disease detection to every farmer's fingertips.
              </motion.p>
              <motion.p variants={fadeUp} custom={3} className="text-muted-foreground mb-8">
                Our mission is to reduce crop losses, empower rural communities, and make sustainable farming accessible to all — regardless of language, location, or technical expertise.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <GlassCard className="text-center py-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm">Our Mission</h4>
                  <p className="text-xs text-muted-foreground mt-1">Zero crop loss through AI</p>
                </GlassCard>
                <GlassCard className="text-center py-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm">Our Team</h4>
                  <p className="text-xs text-muted-foreground mt-1">Researchers & engineers</p>
                </GlassCard>
                <GlassCard className="text-center py-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground text-sm">Our Impact</h4>
                  <p className="text-xs text-muted-foreground mt-1">10K+ farmers served</p>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
