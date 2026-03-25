// src/components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[#3b82f6] bg-[#3b82f6]/10 text-[#3b82f6] hover:bg-[#3b82f6]/20",
        destructive:
          "border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20",
        outline:
          "border border-[#262626] bg-transparent text-[#fafafa] hover:border-[#404040] hover:bg-[#262626]/30",
        secondary:
          "border border-[#262626] bg-[#262626]/30 text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#404040]",
        ghost:
          "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#262626]/30",
        link: "text-[#3b82f6] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
