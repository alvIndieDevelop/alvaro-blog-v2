"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Trophy, Star, Swords, Shield, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Difficulty = "Novice" | "Apprentice" | "Journeyman" | "Expert" | "Master";
export type ProjectStatus = "completed" | "in-progress" | "legendary";
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  difficulty?: Difficulty;
  status?: ProjectStatus;
  xp?: number;
}

const difficultyConfig: Record<Difficulty, { color: string; icon: React.ReactNode; stars: number; rarity: Rarity }> = {
  Novice: { color: "text-[hsl(var(--rarity-common))]", icon: <Shield className="h-3.5 w-3.5" />, stars: 1, rarity: "common" },
  Apprentice: { color: "text-[hsl(var(--rarity-uncommon))]", icon: <Shield className="h-3.5 w-3.5" />, stars: 2, rarity: "uncommon" },
  Journeyman: { color: "text-[hsl(var(--rarity-rare))]", icon: <Swords className="h-3.5 w-3.5" />, stars: 3, rarity: "rare" },
  Expert: { color: "text-[hsl(var(--rarity-epic))]", icon: <Swords className="h-3.5 w-3.5" />, stars: 4, rarity: "epic" },
  Master: { color: "text-gold", icon: <Crown className="h-3.5 w-3.5" />, stars: 5, rarity: "legendary" },
};

const statusConfig: Record<ProjectStatus, { label: string; color: string; bgColor: string }> = {
  completed: { label: "Completed", color: "text-[hsl(var(--stamina))]", bgColor: "bg-[hsl(var(--stamina))]/10 border-[hsl(var(--stamina))]/30" },
  "in-progress": { label: "In Progress", color: "text-ember", bgColor: "bg-ember/10 border-ember/30" },
  legendary: { label: "Legendary", color: "text-gold", bgColor: "bg-gold/10 border-gold/30" },
};

export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  difficulty = "Journeyman",
  status = "completed",
  xp = 100,
}: ProjectCardProps) {
  const diffConfig = difficultyConfig[difficulty];
  const statConfig = statusConfig[status];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        variant="achievement" 
        rarity={diffConfig.rarity}
        className="relative flex flex-col h-full overflow-hidden"
      >
        {/* Achievement Banner */}
        <div className={`absolute top-0 right-0 flex items-center gap-1.5 rounded-bl-lg border-l border-b ${statConfig.bgColor} px-3 py-1.5`}>
          <Trophy className={`h-3.5 w-3.5 ${statConfig.color}`} />
          <span className={`text-xs font-medium ${statConfig.color}`}>{statConfig.label}</span>
        </div>

        <CardHeader className="pb-3 pt-10">
          {/* Difficulty Stars */}
          <div className="flex items-center gap-3 mb-3">
            <span className={`flex items-center gap-1.5 text-xs font-medium ${diffConfig.color}`}>
              {diffConfig.icon}
              {difficulty}
            </span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < diffConfig.stars ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
          </div>
          
          <CardTitle className="text-xl flex items-center gap-2">
            {status === "legendary" && <span className="text-gold">✨</span>}
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between gap-4">
          {/* Technologies as skill tags */}
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <Badge 
                key={tech} 
                variant="skill"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* XP and Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-sm font-mono font-medium text-gold">
              <Zap className="h-4 w-4" />
              <span>+{xp} XP</span>
            </div>
            
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View code on GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              {liveUrl && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
