// src/components/ui/skeleton.tsx

import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-none bg-[#1a4d1a]/30",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
