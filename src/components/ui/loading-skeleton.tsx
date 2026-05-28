import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "avatar" | "button" | "card" | "row";
}

export function LoadingSkeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted/65",
        variant === "text" && "h-4 w-full",
        variant === "avatar" && "h-10 w-10 rounded-full",
        variant === "button" && "h-10 w-24",
        variant === "card" && "h-32 w-full",
        variant === "row" && "h-12 w-full",
        className
      )}
      {...props}
    />
  );
}
