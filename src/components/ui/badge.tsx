import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Default - Golden accent
        default:
          "border-gold/30 bg-gold/10 text-gold hover:bg-gold/20",
        // Secondary - Subtle
        secondary:
          "border-border bg-void-elevated text-muted-foreground hover:bg-void-surface",
        // Destructive - Blood red
        destructive:
          "border-crimson/30 bg-crimson/10 text-[hsl(var(--health))] hover:bg-crimson/20",
        // Outline - Border only
        outline: 
          "border-gold/50 text-gold bg-transparent hover:bg-gold/10",
        // Ethereal - Blue magic
        ethereal:
          "border-ethereal/30 bg-ethereal/10 text-ethereal hover:bg-ethereal/20",
        // Skill - For technology tags
        skill:
          "border-border bg-void-surface text-foreground font-mono text-[10px] hover:border-gold/30 hover:text-gold",
        // Rarity badges
        common:
          "border-[hsl(var(--rarity-common))/50] bg-[hsl(var(--rarity-common))/10] text-[hsl(var(--rarity-common))]",
        uncommon:
          "border-[hsl(var(--rarity-uncommon))/50] bg-[hsl(var(--rarity-uncommon))/10] text-[hsl(var(--rarity-uncommon))]",
        rare:
          "border-[hsl(var(--rarity-rare))/50] bg-[hsl(var(--rarity-rare))/10] text-[hsl(var(--rarity-rare))]",
        epic:
          "border-[hsl(var(--rarity-epic))/50] bg-[hsl(var(--rarity-epic))/10] text-[hsl(var(--rarity-epic))]",
        legendary:
          "border-gold/50 bg-gold/10 text-gold shadow-[0_0_10px_hsl(var(--gold)/0.3)]",
        // Status badges
        success:
          "border-[hsl(var(--stamina))]/30 bg-[hsl(var(--stamina))]/10 text-[hsl(var(--stamina))]",
        warning:
          "border-ember/30 bg-ember/10 text-ember",
        // Wax seal style (for blog tags)
        seal:
          "rounded-full border-2 border-gold/40 bg-gradient-to-b from-gold/20 to-gold/5 text-gold px-3 py-1 shadow-md",
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
