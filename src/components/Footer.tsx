import { Leaf, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="glass-strong border-t border-border/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg btn-glow flex items-center justify-center">
                <Leaf className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">Agri Guard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Powered Smart Plant Disease Detection System for modern agriculture.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <div className="space-y-2">
              <Link to="/detect" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Disease Detection</Link>
              <Link to="/chat" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Chat Assistant</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Access</h4>
            <div className="space-y-2">
              <Link to="/signup" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Sign Up</Link>
              <Link to="/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Login</Link>
              <Link to="/admin/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover-neon transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover-neon transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover-neon transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Agri Guard — University Research Project. Built with AI & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
