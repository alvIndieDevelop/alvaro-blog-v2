"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full border",
  {
    variants: {
      variant: {
        // Default - Gold XP bar
        default: "bg-void-elevated border-gold/30",
        // Health - Red HP bar
        health: "bg-void-elevated border-[hsl(var(--health))]/30",
        // Mana - Blue MP bar
        mana: "bg-void-elevated border-[hsl(var(--mana))]/30",
        // Stamina - Green
        stamina: "bg-void-elevated border-[hsl(var(--stamina))]/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const progressFillVariants = cva(
  "h-full transition-all duration-500 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-gold-dark to-gold shadow-[0_0_10px_hsl(var(--gold)/0.5)]",
        health: "bg-gradient-to-r from-[hsl(var(--crimson))] to-[hsl(var(--health))] shadow-[0_0_10px_hsl(var(--health)/0.5)]",
        mana: "bg-gradient-to-r from-[hsl(210,100%,30%)] to-[hsl(var(--mana))] shadow-[0_0_10px_hsl(var(--mana)/0.5)]",
        stamina: "bg-gradient-to-r from-[hsl(145,63%,30%)] to-[hsl(var(--stamina))] shadow-[0_0_10px_hsl(var(--stamina)/0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, variant, value = 0, max = 100, showValue = false, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1">
            {label && (
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
            )}
            {showValue && (
              <span className="text-xs font-mono text-gold">
                {value}/{max}
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(progressVariants({ variant }), className)}
          {...props}
        >
          <div
            className={cn(progressFillVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress, progressVariants };
