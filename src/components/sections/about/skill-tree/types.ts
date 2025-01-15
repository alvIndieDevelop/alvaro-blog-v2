export interface Skill {
  id: string;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  icon: any;
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