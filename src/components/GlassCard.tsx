import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  neon?: boolean;
}

const GlassCard = ({ children, className, hover = false, neon = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6",
        hover && "hover-neon cursor-pointer hover:scale-[1.02] transition-all duration-300",
        neon && "neon-border",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
