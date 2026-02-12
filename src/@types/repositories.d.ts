/**
 * Repository Types for GitHub and Bitbucket Integration
 * 
 * This module defines the types for fetching and displaying
 * repositories from GitHub and Bitbucket APIs.
 */

// =============================================================================
// GitHub API Types
// =============================================================================

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
  visibility: string;
}

// =============================================================================
// Bitbucket API Types
// =============================================================================

export interface BitbucketRepo {
  uuid: string;
  name: string;
  full_name: string;
  description: string;
  links: {
    html: { href: string };
    clone: Array<{ href: string; name: string }>;
    avatar: { href: string };
  };
  language: string;
  created_on: string;
  updated_on: string;
  is_private: boolean;
  fork_policy: string;
  size: number;
  mainbranch?: {
    name: string;
    type: string;
  };
  project?: {
    key: string;
    name: string;
  };
}

export interface BitbucketResponse {
  values: BitbucketRepo[];
  pagelen: number;
  size: number;
  page: number;
  next?: string;
}

// =============================================================================
// Unified Project Types
// =============================================================================

export type Difficulty = 'Novice' | 'Apprentice' | 'Journeyman' | 'Expert' | 'Master';
export type ProjectStatus = 'completed' | 'in-progress' | 'legendary';
export type ProjectSource = 'github' | 'bitbucket' | 'manual';
export type ProjectRealm = 'forge' | 'workshop' | 'library';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

/**
 * Unified Project interface that normalizes data from both
 * GitHub and Bitbucket into a consistent format.
 */
export interface Project {
  /** Unique identifier (source-prefixed) */
  id: string;
  /** Source platform */
  source: ProjectSource;
  /** Repository/project name */
  name: string;
  /** URL-friendly slug */
  slug: string;
  /** Project description */
  description: string;
  /** Repository URL */
  url: string;
  /** Live demo/homepage URL */
  homepage?: string;
  /** Primary programming language */
  language?: string;
  /** Technologies/frameworks used */
  technologies: string[];
  /** GitHub stars (0 for Bitbucket) */
  stars: number;
  /** Fork count */
  forks: number;
  /** Whether the repo is archived */
  isArchived: boolean;
  /** Creation date (ISO string) */
  createdAt: string;
  /** Last update date (ISO string) */
  updatedAt: string;
  /** Calculated difficulty level */
  difficulty: Difficulty;
  /** Calculated XP reward */
  xp: number;
  /** Project completion status */
  status: ProjectStatus;
  /** Whether this is a featured project */
  featured: boolean;
  /** Which realm this project belongs to */
  realm: ProjectRealm;
  /** Rarity level (derived from difficulty) */
  rarity: Rarity;
  /** Optional client name (for professional work) */
  client?: string;
  /** GitHub topics or tags */
  topics?: string[];
}

/**
 * MDX frontmatter override for projects.
 * Allows manual enhancement of auto-fetched project data.
 */
export interface ProjectOverride {
  /** Slug to match against (required) */
  slug: string;
  /** Override the display title */
  title?: string;
  /** Override the description */
  description?: string;
  /** Override difficulty level */
  difficulty?: Difficulty;
  /** Override XP value */
  xp?: number;
  /** Override status */
  status?: ProjectStatus;
  /** Mark as featured */
  featured?: boolean;
  /** Override realm assignment */
  realm?: ProjectRealm;
  /** Override technologies list */
  technologies?: string[];
  /** Add client name */
  client?: string;
  /** Override homepage URL */
  homepage?: string;
  /** Custom content (MDX body) */
  content?: string;
}

/**
 * Configuration for featured projects.
 * Stored in content/projects/_featured.json
 */
export interface FeaturedProjectsConfig {
  /** List of project slugs to feature */
  featured: string[];
  /** Order of featured projects */
  order?: string[];
}

// =============================================================================
// API Response Types
// =============================================================================

export interface RepositoryFetchResult {
  projects: Project[];
  errors: string[];
  fetchedAt: string;
}

export interface RepositoryStats {
  totalProjects: number;
  totalXP: number;
  byRealm: Record<ProjectRealm, number>;
  byDifficulty: Record<Difficulty, number>;
  bySource: Record<ProjectSource, number>;
}
