import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "premium";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    warning: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
    destructive: "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20 border-destructive/20",
    outline: "text-foreground border-border bg-background",
    premium: "border-transparent bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-500/20"
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}

export { Badge };
