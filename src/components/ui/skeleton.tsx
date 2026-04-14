// src/components/ui/skeleton.tsx

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[#1a1d28]/60",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
