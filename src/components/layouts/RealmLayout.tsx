"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { type RealmId, realms } from "@/lib/realms";
import { cn } from "@/lib/utils";

interface RealmLayoutProps {
  realm: RealmId;
  children: ReactNode;
  className?: string;
  showParticles?: boolean;
}

// Realm-specific background patterns
const realmBackgrounds: Record<RealmId, string> = {
  sanctum: "bg-sanctum-pattern",
  forge: "bg-forge-pattern",
  workshop: "bg-blueprint-pattern",
  tavern: "bg-wood-pattern",
  library: "bg-parchment-pattern",
  map: "bg-map-pattern",
};

// Realm-specific gradient overlays
const realmGradients: Record<RealmId, string> = {
  sanctum: "bg-gradient-to-br from-gold/5 via-transparent to-ethereal/5",
  forge: "bg-gradient-forge",
  workshop: "bg-gradient-workshop",
  tavern: "bg-gradient-tavern",
  library: "bg-gradient-library",
  map: "bg-gradient-to-br from-gold/5 via-transparent to-ethereal/5",
};

// Realm-specific accent colors for decorative elements
const realmAccents: Record<RealmId, { border: string; glow: string }> = {
  sanctum: { border: "border-gold/20", glow: "shadow-gold/10" },
  forge: { border: "border-ember/20", glow: "shadow-ember/10" },
  workshop: { border: "border-ethereal/20", glow: "shadow-ethereal/10" },
  tavern: { border: "border-amber-500/20", glow: "shadow-amber-500/10" },
  library: { border: "border-blue-600/20", glow: "shadow-blue-600/10" },
  map: { border: "border-gold/20", glow: "shadow-gold/10" },
};

export function RealmLayout({ 
  realm, 
  children, 
  className,
  showParticles = true 
}: RealmLayoutProps) {
  const realmData = realms[realm];
  const accents = realmAccents[realm];

  return (
    <div className={cn("relative min-h-screen bg-void overflow-hidden", className)}>
      {/* Background pattern */}
      <div className={cn(
        "absolute inset-0 -z-20 opacity-20",
        realmBackgrounds[realm]
      )} />

      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 -z-10 bg-gradient-to-br",
        realmGradients[realm]
      )} />

      {/* Floating orbs - realm colored */}
      {showParticles && (
        <>
          <div 
            className={cn(
              "absolute top-20 left-[10%] w-72 h-72 rounded-full blur-3xl animate-pulse opacity-30",
              realm === 'forge' && "bg-ember/20",
              realm === 'workshop' && "bg-ethereal/20",
              realm === 'tavern' && "bg-amber-500/20",
              realm === 'library' && "bg-blue-600/20",
              (realm === 'sanctum' || realm === 'map') && "bg-gold/20"
            )} 
          />
          <div 
            className={cn(
              "absolute bottom-40 right-[15%] w-64 h-64 rounded-full blur-3xl animate-pulse opacity-20",
              realm === 'forge' && "bg-orange-600/20",
              realm === 'workshop' && "bg-purple-500/20",
              realm === 'tavern' && "bg-amber-700/20",
              realm === 'library' && "bg-gold/20",
              (realm === 'sanctum' || realm === 'map') && "bg-ethereal/20"
            )}
            style={{ animationDelay: '1s' }}
          />
        </>
      )}

      {/* Decorative top border */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent",
        realm === 'forge' && "via-ember/50",
        realm === 'workshop' && "via-ethereal/50",
        realm === 'tavern' && "via-amber-500/50",
        realm === 'library' && "via-blue-600/50",
        (realm === 'sanctum' || realm === 'map') && "via-gold/50"
      )} />

      {/* Decorative vertical lines */}
      <div className={cn(
        "absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-10",
        realm === 'forge' && "text-ember",
        realm === 'workshop' && "text-ethereal",
        realm === 'tavern' && "text-amber-500",
        realm === 'library' && "text-blue-600",
        (realm === 'sanctum' || realm === 'map') && "text-gold"
      )} />
      <div className={cn(
        "absolute top-0 right-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-10",
        realm === 'forge' && "text-ember",
        realm === 'workshop' && "text-ethereal",
        realm === 'tavern' && "text-amber-500",
        realm === 'library' && "text-blue-600",
        (realm === 'sanctum' || realm === 'map') && "text-gold"
      )} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Realm Hero component for consistent hero sections
interface RealmHeroProps {
  realm: RealmId;
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  children?: ReactNode;
}

export function RealmHero({ 
  realm, 
  badge, 
  title, 
  titleAccent, 
  description,
  children 
}: RealmHeroProps) {
  const realmData = realms[realm];
  const Icon = realmData.icon;

  const accentColorClass = {
    sanctum: "text-gold border-gold/30 bg-gold/10",
    forge: "text-ember border-ember/30 bg-ember/10",
    workshop: "text-ethereal border-ethereal/30 bg-ethereal/10",
    tavern: "text-amber-500 border-amber-500/30 bg-amber-500/10",
    library: "text-blue-500 border-blue-500/30 bg-blue-500/10",
    map: "text-gold border-gold/30 bg-gold/10",
  }[realm];

  const gradientClass = {
    sanctum: "text-gradient-gold",
    forge: "text-gradient-ember",
    workshop: "text-gradient-ethereal",
    tavern: "bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent",
    library: "bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent",
    map: "text-gradient-gold",
  }[realm];

  return (
    <div className="relative pt-20 pb-16 border-b border-border/50">
      {/* Decorative corners */}
      <div className={cn(
        "absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 hidden lg:block",
        realm === 'forge' && "border-ember/20",
        realm === 'workshop' && "border-ethereal/20",
        realm === 'tavern' && "border-amber-500/20",
        realm === 'library' && "border-blue-600/20",
        (realm === 'sanctum' || realm === 'map') && "border-gold/20"
      )} />
      <div className={cn(
        "absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 hidden lg:block",
        realm === 'forge' && "border-ember/20",
        realm === 'workshop' && "border-ethereal/20",
        realm === 'tavern' && "border-amber-500/20",
        realm === 'library' && "border-blue-600/20",
        (realm === 'sanctum' || realm === 'map') && "border-gold/20"
      )} />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Realm icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center mb-10"
          >
            <div className="relative mb-8">
              <div 
                className={cn(
                  "absolute -inset-6 rounded-full border opacity-30",
                  realm === 'forge' && "border-ember",
                  realm === 'workshop' && "border-ethereal",
                  realm === 'tavern' && "border-amber-500",
                  realm === 'library' && "border-blue-600",
                  (realm === 'sanctum' || realm === 'map') && "border-gold"
                )}
                style={{ animation: 'spin 30s linear infinite' }} 
              />
              <div 
                className={cn(
                  "absolute -inset-3 rounded-full border opacity-50",
                  realm === 'forge' && "border-ember",
                  realm === 'workshop' && "border-ethereal",
                  realm === 'tavern' && "border-amber-500",
                  realm === 'library' && "border-blue-600",
                  (realm === 'sanctum' || realm === 'map') && "border-gold"
                )}
                style={{ animation: 'spin 20s linear infinite reverse' }} 
              />
              <div className={cn(
                "relative flex items-center justify-center w-24 h-24 rounded-full bg-void-surface border-2",
                realm === 'forge' && "border-ember/40 shadow-lg shadow-ember/20",
                realm === 'workshop' && "border-ethereal/40 shadow-lg shadow-ethereal/20",
                realm === 'tavern' && "border-amber-500/40 shadow-lg shadow-amber-500/20",
                realm === 'library' && "border-blue-600/40 shadow-lg shadow-blue-600/20",
                (realm === 'sanctum' || realm === 'map') && "border-gold/40 shadow-lg shadow-gold/20"
              )}>
                <Icon className={cn(
                  "h-12 w-12",
                  realm === 'forge' && "text-ember",
                  realm === 'workshop' && "text-ethereal",
                  realm === 'tavern' && "text-amber-500",
                  realm === 'library' && "text-blue-600",
                  (realm === 'sanctum' || realm === 'map') && "text-gold"
                )} />
              </div>
            </div>

            {/* Badge */}
            {badge && (
              <div className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full border backdrop-blur-sm",
                accentColorClass
              )}>
                <span className="font-mono text-sm tracking-wide">{badge}</span>
              </div>
            )}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-2">
              {title}{" "}
              {titleAccent && (
                <span className={gradientClass}>{titleAccent}</span>
              )}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          {/* Additional content (stats, buttons, etc.) */}
          {children && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Realm Section Header component
interface RealmSectionHeaderProps {
  realm: RealmId;
  icon?: React.ReactNode;
  title: string;
}

export function RealmSectionHeader({ realm, icon, title }: RealmSectionHeaderProps) {
  const colorClass = {
    sanctum: "text-gold border-gold/20 bg-void-surface",
    forge: "text-ember border-ember/20 bg-void-surface",
    workshop: "text-ethereal border-ethereal/20 bg-void-surface",
    tavern: "text-amber-500 border-amber-500/20 bg-void-surface",
    library: "text-blue-500 border-blue-500/20 bg-void-surface",
    map: "text-gold border-gold/20 bg-void-surface",
  }[realm];

  const lineColor = {
    sanctum: "from-transparent to-gold/30",
    forge: "from-transparent to-ember/30",
    workshop: "from-transparent to-ethereal/30",
    tavern: "from-transparent to-amber-500/30",
    library: "from-transparent to-blue-600/30",
    map: "from-transparent to-gold/30",
  }[realm];

  return (
    <div className="flex items-center gap-4 mb-10">
      <div className={cn("h-[1px] flex-1 bg-gradient-to-r", lineColor)} />
      <div className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-xl border",
        colorClass
      )}>
        {icon}
        <h2 className="font-display text-lg">{title}</h2>
      </div>
      <div className={cn("h-[1px] flex-1 bg-gradient-to-l", lineColor)} />
    </div>
  );
}
