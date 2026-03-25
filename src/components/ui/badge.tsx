// src/components/ui/badge.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 font-medium text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#3b82f6]",
  {
    variants: {
      variant: {
        default:
          "border-[#3b82f6] bg-[#3b82f6]/10 text-[#60a5fa]",
        secondary:
          "border-[#262626] bg-[#262626]/50 text-[#a1a1aa]",
        destructive:
          "border-red-500/50 bg-red-500/10 text-red-400",
        outline: "border-[#262626] text-[#fafafa]",
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
