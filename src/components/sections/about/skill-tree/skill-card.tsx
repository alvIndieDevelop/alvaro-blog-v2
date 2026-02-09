"use client";
import { motion } from "framer-motion";
import { Skill } from "./types";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onSelect: () => void;
}

// Get rarity based on skill level
function getRarity(level: number, maxLevel: number): "common" | "uncommon" | "rare" | "epic" | "legendary" {
  const percentage = level / maxLevel;
  if (percentage >= 1) return "legendary";
  if (percentage >= 0.8) return "epic";
  if (percentage >= 0.6) return "rare";
  if (percentage >= 0.4) return "uncommon";
  return "common";
}

// Get rarity colors
function getRarityColors(rarity: string) {
  switch (rarity) {
    case "legendary":
      return {
        border: "border-gold",
        bg: "bg-gold/10",
        text: "text-gold",
        glow: "shadow-[0_0_15px_rgba(212,175,55,0.3)]",
        bar: "bg-gradient-to-r from-gold to-amber-400",
      };
    case "epic":
      return {
        border: "border-purple-500",
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        glow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        bar: "bg-gradient-to-r from-purple-500 to-pink-500",
      };
    case "rare":
      return {
        border: "border-ethereal",
        bg: "bg-ethereal/10",
        text: "text-ethereal",
        glow: "shadow-[0_0_15px_rgba(100,200,255,0.3)]",
        bar: "bg-gradient-to-r from-ethereal to-cyan-400",
      };
    case "uncommon":
      return {
        border: "border-emerald-500",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        glow: "shadow-[0_0_10px_rgba(16,185,129,0.2)]",
        bar: "bg-gradient-to-r from-emerald-500 to-green-400",
      };
    default:
      return {
        border: "border-muted",
        bg: "bg-muted/10",
        text: "text-muted-foreground",
        glow: "",
        bar: "bg-muted-foreground",
      };
  }
}

export function SkillCard({ skill, isSelected, onSelect }: SkillCardProps) {
  const rarity = getRarity(skill.level, skill.maxLevel);
  const colors = getRarityColors(rarity);
  const Icon = skill.icon;
  const percentage = (skill.level / skill.maxLevel) * 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "relative cursor-pointer rounded-lg border p-3 transition-all duration-300",
        "bg-void-surface hover:bg-void-elevated",
        colors.border,
        isSelected && colors.glow
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            colors.bg
          )}
        >
          <Icon className={cn("h-5 w-5", colors.text)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-medium text-foreground truncate">{skill.name}</h4>
            <span className={cn("font-mono text-xs", colors.text)}>
              Lv.{skill.level}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1.5 w-full rounded-full bg-void overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={cn("h-full rounded-full", colors.bar)}
            />
          </div>

          {/* Description (shown when selected) */}
          {isSelected && skill.description && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-muted-foreground"
            >
              {skill.description}
            </motion.p>
          )}
        </div>
      </div>

      {/* Rarity indicator */}
      {rarity === "legendary" && (
        <div className="absolute -top-1 -right-1">
          <Star className="h-4 w-4 text-gold fill-gold animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}
