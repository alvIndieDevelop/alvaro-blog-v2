import { 
  Castle, 
  Hammer, 
  Gamepad2, 
  Beer, 
  Library, 
  Map,
  type LucideIcon 
} from "lucide-react";

// Realm types
export type RealmId = 'sanctum' | 'forge' | 'workshop' | 'tavern' | 'library' | 'map';

export interface Realm {
  id: RealmId;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    gradient: string;
  };
  atmosphere: string;
}

// Realm definitions
export const realms: Record<RealmId, Realm> = {
  sanctum: {
    id: 'sanctum',
    name: 'The Sanctum',
    title: 'Home',
    description: 'The central hub - your personal castle and headquarters',
    icon: Castle,
    path: '/',
    colors: {
      primary: 'gold',
      secondary: 'void',
      accent: 'ethereal',
      glow: 'rgba(212, 175, 55, 0.3)',
      gradient: 'from-gold/20 via-transparent to-ethereal/10',
    },
    atmosphere: 'epic',
  },
  forge: {
    id: 'forge',
    name: 'The Forge',
    title: 'Professional',
    description: 'Professional work, career, and services',
    icon: Hammer,
    path: '/forge',
    colors: {
      primary: 'ember',
      secondary: 'charcoal',
      accent: 'gold',
      glow: 'rgba(255, 69, 0, 0.3)',
      gradient: 'from-ember/20 via-transparent to-gold/10',
    },
    atmosphere: 'industrial',
  },
  workshop: {
    id: 'workshop',
    name: 'The Workshop',
    title: 'Creative',
    description: 'Game development, creative projects, and experiments',
    icon: Gamepad2,
    path: '/workshop',
    colors: {
      primary: 'ethereal',
      secondary: 'purple-900',
      accent: 'cyan-400',
      glow: 'rgba(100, 200, 255, 0.3)',
      gradient: 'from-ethereal/20 via-transparent to-purple-500/10',
    },
    atmosphere: 'magical',
  },
  tavern: {
    id: 'tavern',
    name: 'The Tavern',
    title: 'Personal',
    description: 'Personal life, hobbies, and community',
    icon: Beer,
    path: '/tavern',
    colors: {
      primary: 'amber-500',
      secondary: 'amber-900',
      accent: 'amber-200',
      glow: 'rgba(245, 158, 11, 0.3)',
      gradient: 'from-amber-500/20 via-transparent to-amber-200/10',
    },
    atmosphere: 'cozy',
  },
  library: {
    id: 'library',
    name: 'The Library',
    title: 'Knowledge',
    description: 'Technical blog, tutorials, and ideas',
    icon: Library,
    path: '/library',
    colors: {
      primary: 'blue-600',
      secondary: 'blue-900',
      accent: 'gold',
      glow: 'rgba(37, 99, 235, 0.3)',
      gradient: 'from-blue-600/20 via-transparent to-gold/10',
    },
    atmosphere: 'scholarly',
  },
  map: {
    id: 'map',
    name: 'The Map',
    title: 'Explore',
    description: 'Visual overview of all realms',
    icon: Map,
    path: '/map',
    colors: {
      primary: 'gold',
      secondary: 'void',
      accent: 'ethereal',
      glow: 'rgba(212, 175, 55, 0.3)',
      gradient: 'from-gold/20 via-transparent to-ethereal/10',
    },
    atmosphere: 'adventure',
  },
};

// Navigation realms (excluding map for main nav)
export const navigationRealms: RealmId[] = ['sanctum', 'forge', 'workshop', 'tavern', 'library'];

// Get realm by path
export function getRealmByPath(path: string): Realm | undefined {
  return Object.values(realms).find(realm => realm.path === path);
}

// Get realm color classes
export function getRealmColorClasses(realmId: RealmId) {
  const realm = realms[realmId];
  return {
    text: `text-${realm.colors.primary}`,
    bg: `bg-${realm.colors.primary}`,
    border: `border-${realm.colors.primary}`,
    glow: `shadow-[0_0_20px_${realm.colors.glow}]`,
  };
}

// Content types for each realm
export type ForgeContentType = 'project' | 'service' | 'experience';
export type WorkshopContentType = 'game' | 'experiment' | 'tool' | 'jam';
export type TavernContentType = 'tale' | 'hobby' | 'favorite' | 'update';
export type LibraryContentType = 'scroll' | 'tome' | 'note' | 'idea';

// Base content interface
export interface RealmContent {
  id: string;
  title: string;
  description: string;
  realm: RealmId;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
}

// Forge-specific content
export interface ForgeProject extends RealmContent {
  realm: 'forge';
  type: ForgeContentType;
  client?: string;
  technologies: string[];
  links: { github?: string; live?: string };
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
}

// Workshop-specific content
export interface WorkshopProject extends RealmContent {
  realm: 'workshop';
  type: WorkshopContentType;
  platform: string[];
  developmentStatus: 'concept' | 'prototype' | 'development' | 'released';
  playable: boolean;
  links: { itch?: string; github?: string; play?: string };
}

// Tavern-specific content
export interface TavernPost extends RealmContent {
  realm: 'tavern';
  type: TavernContentType;
  mood: 'happy' | 'reflective' | 'excited' | 'casual';
  media?: { images: string[]; videos: string[] };
}

// Library-specific content
export interface LibraryPost extends RealmContent {
  realm: 'library';
  type: LibraryContentType;
  readingTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  series?: string;
  prerequisites?: string[];
}
