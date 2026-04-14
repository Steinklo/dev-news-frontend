// src/components/ui/badge.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500/50",
  {
    variants: {
      variant: {
        default:
          "border-indigo-500/20 bg-indigo-500/10 text-indigo-400",
        secondary:
          "border-[#1a1d28] bg-[#1a1d28]/50 text-[#5a6070]",
        destructive:
          "border-red-500/20 bg-red-500/10 text-red-400",
        outline: "border-[#2a2e3d] text-[#9ba1b0]",
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
