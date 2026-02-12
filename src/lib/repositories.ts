/**
 * Unified Repositories Service
 * 
 * Combines GitHub and Bitbucket repositories into a unified format,
 * applies MDX overrides, and provides filtering/sorting utilities.
 */

import { fetchGitHubRepos } from './github';
import { fetchBitbucketRepos } from './bitbucket';
import type {
  Project,
  GitHubRepo,
  BitbucketRepo,
  Difficulty,
  ProjectRealm,
  ProjectOverride,
  Rarity,
  RepositoryStats,
} from '@/@types/repositories';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// =============================================================================
// Constants
// =============================================================================

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

/**
 * Mapping of programming languages to related technologies
 */
const LANGUAGE_TECH_MAP: Record<string, string[]> = {
  'TypeScript': ['TypeScript', 'JavaScript'],
  'JavaScript': ['JavaScript'],
  'Python': ['Python'],
  'Java': ['Java'],
  'C#': ['C#', '.NET'],
  'C++': ['C++'],
  'Go': ['Go', 'Golang'],
  'Rust': ['Rust'],
  'PHP': ['PHP'],
  'Ruby': ['Ruby'],
  'Swift': ['Swift', 'iOS'],
  'Kotlin': ['Kotlin', 'Android'],
  'Dart': ['Dart', 'Flutter'],
  'Shell': ['Shell', 'Bash'],
  'HTML': ['HTML'],
  'CSS': ['CSS'],
  'SCSS': ['SCSS', 'CSS'],
};

/**
 * Keywords that indicate a project belongs to the Workshop realm (games/creative)
 */
const WORKSHOP_KEYWORDS = [
  'game', 'unity', 'godot', 'unreal', 'gamedev', 'experiment',
  'demo', 'prototype', 'jam', 'pixel', 'rpg', '2d', '3d',
];

/**
 * Keywords that indicate a project belongs to the Library realm (learning/docs)
 */
const LIBRARY_KEYWORDS = [
  'tutorial', 'guide', 'docs', 'documentation', 'learning',
  'template', 'boilerplate', 'starter', 'example', 'sample',
];

/**
 * Technologies considered "complex" for difficulty calculation
 */
const COMPLEX_TECHNOLOGIES = [
  'TypeScript', 'Rust', 'Go', 'C++', 'Kubernetes', 'Docker',
  'GraphQL', 'PostgreSQL', 'Redis', 'Elasticsearch', 'AWS',
  'Terraform', 'WebAssembly', 'Machine Learning',
];

/**
 * Fallback projects when API calls fail
 */
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'fallback-1',
    source: 'manual',
    name: 'Flask Template',
    slug: 'flask-template',
    description: 'A battle-tested flask template for rapid web application deployment',
    url: 'https://github.com/alvIndieDevelop/flask_template',
    language: 'Python',
    technologies: ['Python', 'Flask'],
    stars: 0,
    forks: 0,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: 'Apprentice',
    xp: 150,
    status: 'completed',
    featured: false,
    realm: 'forge',
    rarity: 'uncommon',
  },
  {
    id: 'fallback-2',
    source: 'manual',
    name: 'Project Generator NodeJS',
    slug: 'project-generator-nodejs',
    description: 'CLI tool that conjures project scaffolds from the command line',
    url: 'https://github.com/alvIndieDevelop/project-generator-nodejs',
    language: 'TypeScript',
    technologies: ['NodeJS', 'JavaScript', 'TypeScript', 'NPM'],
    stars: 0,
    forks: 0,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: 'Journeyman',
    xp: 250,
    status: 'completed',
    featured: false,
    realm: 'forge',
    rarity: 'rare',
  },
  {
    id: 'fallback-3',
    source: 'manual',
    name: 'ExpressJS TypeScript Boilerplate',
    slug: 'expressjs-typescript-boilerplate',
    description: 'A fortified boilerplate for building robust Express applications',
    url: 'https://github.com/alvIndieDevelop/expressjs-typescript-boilplate',
    language: 'TypeScript',
    technologies: ['NodeJS', 'TypeScript', 'ExpressJS'],
    stars: 0,
    forks: 0,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    difficulty: 'Journeyman',
    xp: 200,
    status: 'completed',
    featured: false,
    realm: 'library',
    rarity: 'rare',
  },
];

// =============================================================================
// Transformation Functions
// =============================================================================

/**
 * Calculate difficulty based on repository metrics
 */
function calculateDifficulty(
  stars: number,
  technologies: string[],
  topics: string[] = []
): Difficulty {
  let score = 0;

  // Based on technologies count (max 30 points)
  score += Math.min(technologies.length * 10, 30);

  // Based on stars - popularity indicates complexity (max 20 points)
  score += Math.min(stars * 2, 20);

  // Based on complex technologies (15 points if any)
  const hasComplexTech = technologies.some(t =>
    COMPLEX_TECHNOLOGIES.some(ct => t.toLowerCase().includes(ct.toLowerCase()))
  );
  if (hasComplexTech) score += 15;

  // Based on topics count (max 15 points)
  score += Math.min(topics.length * 3, 15);

  // Map score to difficulty
  if (score < 20) return 'Novice';
  if (score < 40) return 'Apprentice';
  if (score < 60) return 'Journeyman';
  if (score < 80) return 'Expert';
  return 'Master';
}

/**
 * Calculate XP reward based on difficulty and metrics
 */
function calculateXP(
  difficulty: Difficulty,
  stars: number,
  techCount: number
): number {
  const baseXP: Record<Difficulty, number> = {
    'Novice': 50,
    'Apprentice': 100,
    'Journeyman': 200,
    'Expert': 350,
    'Master': 500,
  };

  const base = baseXP[difficulty];
  const starBonus = stars * 10;
  const techBonus = techCount * 25;

  return base + starBonus + techBonus;
}

/**
 * Map difficulty to rarity
 */
function difficultyToRarity(difficulty: Difficulty): Rarity {
  const mapping: Record<Difficulty, Rarity> = {
    'Novice': 'common',
    'Apprentice': 'uncommon',
    'Journeyman': 'rare',
    'Expert': 'epic',
    'Master': 'legendary',
  };
  return mapping[difficulty];
}

/**
 * Determine which realm a project belongs to based on keywords
 */
function determineRealm(topics: string[], name: string, description: string): ProjectRealm {
  const allText = [...topics, name, description].join(' ').toLowerCase();

  // Check for Workshop keywords (games/creative)
  if (WORKSHOP_KEYWORDS.some(keyword => allText.includes(keyword))) {
    return 'workshop';
  }

  // Check for Library keywords (learning/docs)
  if (LIBRARY_KEYWORDS.some(keyword => allText.includes(keyword))) {
    return 'library';
  }

  // Default to Forge (professional)
  return 'forge';
}

/**
 * Create a URL-friendly slug from a name
 */
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Extract technologies from language and topics
 */
function extractTechnologies(
  language: string | null | undefined,
  topics: string[] = []
): string[] {
  const technologies: string[] = [];

  // Add language-based technologies
  if (language && LANGUAGE_TECH_MAP[language]) {
    technologies.push(...LANGUAGE_TECH_MAP[language]);
  } else if (language) {
    technologies.push(language);
  }

  // Add topics as technologies (capitalize first letter)
  const topicTechs = topics.map(t =>
    t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, ' ')
  );
  technologies.push(...topicTechs);

  // Remove duplicates
  return Array.from(new Set(technologies));
}

/**
 * Transform a GitHub repository to unified Project format
 */
function transformGitHubRepo(repo: GitHubRepo): Project {
  const technologies = extractTechnologies(repo.language, repo.topics);
  const difficulty = calculateDifficulty(repo.stargazers_count, technologies, repo.topics);
  const description = repo.description || 'No description provided';

  return {
    id: `github-${repo.id}`,
    source: 'github',
    name: repo.name,
    slug: createSlug(repo.name),
    description,
    url: repo.html_url,
    homepage: repo.homepage || undefined,
    language: repo.language || undefined,
    technologies,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isArchived: repo.archived,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    difficulty,
    xp: calculateXP(difficulty, repo.stargazers_count, technologies.length),
    status: 'completed',
    featured: false,
    realm: determineRealm(repo.topics, repo.name, description),
    rarity: difficultyToRarity(difficulty),
    topics: repo.topics,
  };
}

/**
 * Transform a Bitbucket repository to unified Project format
 */
function transformBitbucketRepo(repo: BitbucketRepo): Project {
  const technologies = extractTechnologies(repo.language);
  const difficulty = calculateDifficulty(0, technologies);
  const description = repo.description || 'No description provided';

  return {
    id: `bitbucket-${repo.uuid}`,
    source: 'bitbucket',
    name: repo.name,
    slug: createSlug(repo.name),
    description,
    url: repo.links.html.href,
    language: repo.language || undefined,
    technologies,
    stars: 0, // Bitbucket doesn't have stars
    forks: 0,
    isArchived: false,
    createdAt: repo.created_on,
    updatedAt: repo.updated_on,
    difficulty,
    xp: calculateXP(difficulty, 0, technologies.length),
    status: 'completed',
    featured: false,
    realm: determineRealm([], repo.name, description),
    rarity: difficultyToRarity(difficulty),
  };
}

// =============================================================================
// MDX Override System
// =============================================================================

/**
 * Load project overrides from MDX files
 */
function loadProjectOverrides(): Map<string, ProjectOverride> {
  const overrides = new Map<string, ProjectOverride>();

  if (!fs.existsSync(PROJECTS_DIR)) {
    return overrides;
  }

  try {
    const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(PROJECTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      if (data.slug) {
        overrides.set(data.slug, data as ProjectOverride);
      }
    }
  } catch (error) {
    console.error('Error loading project overrides:', error);
  }

  return overrides;
}

/**
 * Load featured projects configuration
 */
function loadFeaturedConfig(): string[] {
  const configPath = path.join(PROJECTS_DIR, '_featured.json');

  if (!fs.existsSync(configPath)) {
    return [];
  }

  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(content);
    return config.featured || [];
  } catch (error) {
    console.error('Error loading featured config:', error);
    return [];
  }
}

/**
 * Apply MDX overrides to projects
 */
function applyOverrides(
  projects: Project[],
  overrides: Map<string, ProjectOverride>,
  featuredSlugs: string[]
): Project[] {
  return projects.map(project => {
    const override = overrides.get(project.slug);
    const isFeatured = featuredSlugs.includes(project.slug);

    if (!override && !isFeatured) {
      return project;
    }

    return {
      ...project,
      name: override?.title || project.name,
      description: override?.description || project.description,
      difficulty: override?.difficulty || project.difficulty,
      xp: override?.xp || project.xp,
      status: override?.status || project.status,
      featured: override?.featured ?? isFeatured ?? project.featured,
      realm: override?.realm || project.realm,
      technologies: override?.technologies || project.technologies,
      client: override?.client || project.client,
      homepage: override?.homepage || project.homepage,
      rarity: override?.difficulty
        ? difficultyToRarity(override.difficulty)
        : project.rarity,
    };
  });
}

// =============================================================================
// Public API
// =============================================================================

/**
 * Fetch all projects from GitHub and Bitbucket
 * 
 * @returns Array of unified Project objects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    // Fetch from both sources in parallel
    const [githubRepos, bitbucketRepos] = await Promise.all([
      fetchGitHubRepos(),
      fetchBitbucketRepos(),
    ]);

    // Transform to unified format
    const githubProjects = githubRepos.map(transformGitHubRepo);
    const bitbucketProjects = bitbucketRepos.map(transformBitbucketRepo);

    let allProjects = [...githubProjects, ...bitbucketProjects];

    // Load and apply MDX overrides
    const overrides = loadProjectOverrides();
    const featuredSlugs = loadFeaturedConfig();
    allProjects = applyOverrides(allProjects, overrides, featuredSlugs);

    // Sort by updated date (most recent first)
    allProjects.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    console.log(`[Repositories] Total: ${allProjects.length} projects`);
    return allProjects;
  } catch (error) {
    console.error('Failed to fetch projects, using fallback:', error);
    return FALLBACK_PROJECTS;
  }
}

/**
 * Get featured projects
 * 
 * @param limit - Maximum number of projects to return
 * @returns Array of featured projects
 */
export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const projects = await getAllProjects();

  // First, get explicitly featured projects
  const featured = projects.filter(p => p.featured);

  // If not enough featured, fill with highest XP projects
  if (featured.length < limit) {
    const nonFeatured = projects
      .filter(p => !p.featured)
      .sort((a, b) => b.xp - a.xp);

    return [...featured, ...nonFeatured].slice(0, limit);
  }

  return featured.slice(0, limit);
}

/**
 * Get projects by realm
 * 
 * @param realm - The realm to filter by
 * @returns Array of projects in the specified realm
 */
export async function getProjectsByRealm(realm: ProjectRealm): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(p => p.realm === realm);
}

/**
 * Get projects for The Forge (professional)
 */
export async function getForgeProjects(): Promise<Project[]> {
  return getProjectsByRealm('forge');
}

/**
 * Get projects for The Workshop (creative/games)
 */
export async function getWorkshopProjects(): Promise<Project[]> {
  return getProjectsByRealm('workshop');
}

/**
 * Get projects for The Library (learning/templates)
 */
export async function getLibraryProjects(): Promise<Project[]> {
  return getProjectsByRealm('library');
}

/**
 * Get a single project by slug
 * 
 * @param slug - Project slug
 * @returns Project or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(p => p.slug === slug) || null;
}

/**
 * Get repository statistics
 * 
 * @returns Statistics about all projects
 */
export async function getRepositoryStats(): Promise<RepositoryStats> {
  const projects = await getAllProjects();

  const stats: RepositoryStats = {
    totalProjects: projects.length,
    totalXP: projects.reduce((sum, p) => sum + p.xp, 0),
    byRealm: {
      forge: 0,
      workshop: 0,
      library: 0,
    },
    byDifficulty: {
      Novice: 0,
      Apprentice: 0,
      Journeyman: 0,
      Expert: 0,
      Master: 0,
    },
    bySource: {
      github: 0,
      bitbucket: 0,
      manual: 0,
    },
  };

  for (const project of projects) {
    stats.byRealm[project.realm]++;
    stats.byDifficulty[project.difficulty]++;
    stats.bySource[project.source]++;
  }

  return stats;
}

/**
 * Search projects by query
 * 
 * @param query - Search query
 * @returns Matching projects
 */
export async function searchProjects(query: string): Promise<Project[]> {
  const projects = await getAllProjects();
  const lowerQuery = query.toLowerCase();

  return projects.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.technologies.some(t => t.toLowerCase().includes(lowerQuery)) ||
    p.topics?.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get projects by technology
 * 
 * @param technology - Technology to filter by
 * @returns Projects using the specified technology
 */
export async function getProjectsByTechnology(technology: string): Promise<Project[]> {
  const projects = await getAllProjects();
  const lowerTech = technology.toLowerCase();

  return projects.filter(p =>
    p.technologies.some(t => t.toLowerCase() === lowerTech)
  );
}

/**
 * Get all unique technologies across all projects
 * 
 * @returns Array of unique technology names
 */
export async function getAllTechnologies(): Promise<string[]> {
  const projects = await getAllProjects();
  const technologies = new Set<string>();

  for (const project of projects) {
    for (const tech of project.technologies) {
      technologies.add(tech);
    }
  }

  return Array.from(technologies).sort();
}
