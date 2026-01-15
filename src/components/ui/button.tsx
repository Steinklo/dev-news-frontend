// src/components/ui/button.tsx

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#33ff33] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-[#33ff33] bg-[#33ff33]/10 text-[#33ff33] hover:bg-[#33ff33]/20 hover:shadow-[0_0_10px_rgba(51,255,51,0.3)]",
        destructive:
          "border border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20",
        outline:
          "border border-[#1a4d1a] bg-transparent text-[#33ff33] hover:border-[#33ff33] hover:bg-[#1a4d1a]/20",
        secondary:
          "border border-[#1a4d1a] bg-[#1a4d1a]/20 text-[#1a8c1a] hover:text-[#33ff33] hover:border-[#33ff33]",
        ghost:
          "text-[#1a8c1a] hover:text-[#33ff33] hover:bg-[#1a4d1a]/20",
        link: "text-[#33ff33] underline-offset-4 hover:underline",
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
