import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary - Golden fantasy button
        default:
          "bg-gradient-to-b from-gold-light to-gold border border-gold-dark text-void shadow-md hover:from-gold hover:to-gold-dark hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98]",
        // Destructive - Blood red
        destructive:
          "bg-gradient-to-b from-crimson to-[hsl(0,100%,20%)] border border-[hsl(0,100%,15%)] text-foreground shadow-md hover:shadow-lg hover:shadow-crimson/20 active:scale-[0.98]",
        // Outline - Golden border
        outline:
          "border-2 border-gold/50 bg-transparent text-gold hover:bg-gold/10 hover:border-gold hover:shadow-md hover:shadow-gold/10 active:scale-[0.98]",
        // Secondary - Subtle dark
        secondary:
          "bg-void-elevated border border-border text-foreground hover:bg-void-surface hover:border-gold/30 hover:text-gold active:scale-[0.98]",
        // Ghost - Minimal
        ghost:
          "text-muted-foreground hover:bg-gold/10 hover:text-gold active:scale-[0.98]",
        // Link - Text only
        link: 
          "text-gold underline-offset-4 hover:underline hover:text-gold-light",
        // Ethereal - Blue magic style
        ethereal:
          "bg-gradient-to-b from-ethereal to-[hsl(210,100%,45%)] border border-[hsl(210,100%,35%)] text-void shadow-md hover:shadow-lg hover:shadow-ethereal/20 active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        ...props,
        ...childProps,
        className: cn(buttonVariants({ variant, size, className }), childProps.className as string | undefined),
        ref,
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
