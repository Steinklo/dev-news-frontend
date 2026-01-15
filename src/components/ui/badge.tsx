// src/components/ui/badge.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2 py-0.5 font-mono text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#33ff33]",
  {
    variants: {
      variant: {
        default:
          "border-[#33ff33] bg-[#33ff33]/10 text-[#33ff33]",
        secondary:
          "border-[#1a4d1a] bg-[#1a4d1a]/20 text-[#1a8c1a]",
        destructive:
          "border-red-500/50 bg-red-500/10 text-red-400",
        outline: "border-[#1a4d1a] text-[#33ff33]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
