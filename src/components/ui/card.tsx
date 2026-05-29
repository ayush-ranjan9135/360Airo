import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the main Card container.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Applies a glassmorphism effect if true */
  glass?: boolean;
  /** Applies a subtle glowing border on hover if true */
  hoverGlow?: boolean;
}

/**
 * Main wrapper for the Card component family.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass, hoverGlow, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-xs transition-all duration-200",
        glass && "glass-panel-light dark:glass-panel",
        hoverGlow && "hover:shadow-md hover:border-ring/30",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/**
 * Header section of the Card.
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * Title text within the CardHeader.
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/**
 * Subtitle or description text within the CardHeader.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/**
 * Main content area of the Card.
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/**
 * Footer section of the Card. Usually contains action buttons.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0 border-t border-border/40 mt-4", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
