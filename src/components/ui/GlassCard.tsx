import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function GlassCard({
  className,
  hoverEffect = true,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-6 md:p-8 transition-all duration-300",
        hoverEffect && "hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10 hover:border-white/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
