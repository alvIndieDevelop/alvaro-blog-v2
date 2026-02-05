import { LucideIcon } from "lucide-react";

export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  icon: LucideIcon;
  requires?: string[];
  unlocks?: string[];
  experience: number;
  nextLevelExp: number;
  effects: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Position {
  x: number;
  y: number;
}

export interface SkillNode {
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  icon: LucideIcon;
  position: Position;
  isUnlocked: boolean;
  prerequisites?: string[];
}
