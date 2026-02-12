import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border transition-all duration-300",
  {
    variants: {
      variant: {
        // Default - Dark fantasy card
        default:
          "bg-card border-gold/20 shadow-lg hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5",
        // Elevated - Slightly lighter
        elevated:
          "bg-void-elevated border-gold/20 shadow-lg hover:border-gold/40 hover:shadow-xl hover:shadow-gold/5",
        // Parchment - For character sheets, lore
        parchment:
          "bg-parchment border-gold/30 shadow-lg",
        // Achievement - For project cards with rarity
        achievement:
          "bg-card border-2 shadow-lg hover:shadow-xl hover:-translate-y-1",
        // Ghost - Minimal, transparent
        ghost:
          "bg-transparent border-border/50 hover:border-gold/30 hover:bg-card/50",
      },
      // Rarity variants for achievement cards
      rarity: {
        common: "border-[hsl(var(--rarity-common))]",
        uncommon: "border-[hsl(var(--rarity-uncommon))] shadow-[0_0_10px_hsl(var(--rarity-uncommon)/0.3)]",
        rare: "border-[hsl(var(--rarity-rare))] shadow-[0_0_15px_hsl(var(--rarity-rare)/0.3)]",
        epic: "border-[hsl(var(--rarity-epic))] shadow-[0_0_20px_hsl(var(--rarity-epic)/0.3)]",
        legendary: "border-[hsl(var(--rarity-legendary))] shadow-[0_0_25px_hsl(var(--rarity-legendary)/0.4)] animate-[legendary-pulse_2s_ease-in-out_infinite]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, rarity, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, rarity, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-2xl font-semibold leading-none tracking-tight text-gold",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
