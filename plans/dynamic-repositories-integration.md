# Dynamic Repositories Integration Plan

## Overview

Integrate GitHub and Bitbucket APIs to dynamically fetch and display public repositories in The Forge (professional section) and the home page projects section. This replaces the current hardcoded project data with live data from your Git hosting platforms.

---

## Architecture

```mermaid
flowchart TB
    subgraph Build Time
        A[next build] --> B[Fetch GitHub Repos]
        A --> C[Fetch Bitbucket Repos]
        B --> D[github.ts service]
        C --> E[bitbucket.ts service]
        D --> F[repositories.ts unified service]
        E --> F
        F --> G[Filter: exclude forks]
        G --> H[Merge & deduplicate]
        H --> I[Sort by updated date]
        I --> J[Transform to Project format]
    end
    
    subgraph Content Layer
        K[MDX Override Files] --> L[content/projects/*.mdx]
        L --> M[Manual project enhancements]
        M --> J
    end
    
    subgraph Output
        J --> N[Static HTML Pages]
        N --> O[ISR: Revalidate 6h]
    end
    
    subgraph Pages
        O --> P[/forge - Professional]
        O --> Q[/ - Home Projects]
        O --> R[/projects - All Projects]
    end
```

---

## Data Flow

### 1. API Response → Unified Format

```typescript
// GitHub API Response (simplified)
interface GitHubRepo {
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
}

// Bitbucket API Response (simplified)
interface BitbucketRepo {
  uuid: string;
  name: string;
  full_name: string;
  description: string;
  links: {
    html: { href: string };
    clone: Array<{ href: string; name: string }>;
  };
  language: string;
  created_on: string;
  updated_on: string;
  is_private: boolean;
  fork_policy: string;
}

// Unified Project Format
interface Project {
  id: string;
  source: 'github' | 'bitbucket';
  name: string;
  slug: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  technologies: string[];
  stars: number;
  forks: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  // RPG-style fields (calculated or from MDX override)
  difficulty: 'Novice' | 'Apprentice' | 'Journeyman' | 'Expert' | 'Master';
  xp: number;
  status: 'completed' | 'in-progress' | 'legendary';
  featured: boolean;
  realm: 'forge' | 'workshop' | 'library';
}
```

### 2. Difficulty Calculation Algorithm

```typescript
function calculateDifficulty(repo: Project): Difficulty {
  let score = 0;
  
  // Based on technologies count
  score += Math.min(repo.technologies.length * 10, 30);
  
  // Based on stars (popularity indicates complexity)
  score += Math.min(repo.stars * 2, 20);
  
  // Based on age (older projects tend to be more mature)
  const ageInMonths = getAgeInMonths(repo.createdAt);
  score += Math.min(ageInMonths, 20);
  
  // Based on language complexity
  const complexLanguages = ['TypeScript', 'Rust', 'Go', 'C++'];
  if (complexLanguages.includes(repo.language)) score += 15;
  
  // Map score to difficulty
  if (score < 20) return 'Novice';
  if (score < 40) return 'Apprentice';
  if (score < 60) return 'Journeyman';
  if (score < 80) return 'Expert';
  return 'Master';
}

function calculateXP(repo: Project): number {
  const difficultyMultiplier = {
    'Novice': 50,
    'Apprentice': 100,
    'Journeyman': 200,
    'Expert': 350,
    'Master': 500,
  };
  
  const base = difficultyMultiplier[repo.difficulty];
  const starBonus = repo.stars * 10;
  const techBonus = repo.technologies.length * 25;
  
  return base + starBonus + techBonus;
}
```

---

## File Structure

```
src/
├── lib/
│   ├── github.ts           # GitHub API client
│   ├── bitbucket.ts        # Bitbucket API client
│   ├── repositories.ts     # Unified repository service
│   └── blog.ts             # Existing blog service
├── @types/
│   ├── schema.d.ts         # Existing types
│   └── repositories.d.ts   # NEW: Repository types
├── app/
│   ├── page.tsx            # Update to use dynamic projects
│   ├── forge/
│   │   └── page.tsx        # Update to use dynamic projects
│   └── projects/
│       └── page.tsx        # Update to use dynamic projects
└── components/
    └── sections/
        └── projects/
            ├── index.tsx       # Update data source
            └── project-card.tsx # Already styled

content/
└── projects/               # NEW: MDX overrides
    ├── _featured.json      # Featured projects config
    ├── flask-template.mdx  # Override for specific project
    └── sailo-clone.mdx     # Override for specific project

.env.local                  # API tokens (optional for public repos)
```

---

## Implementation Steps

### Step 1: Define TypeScript Interfaces

Create `src/@types/repositories.d.ts`:

```typescript
// Source-specific types
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
}

export interface BitbucketRepo {
  uuid: string;
  name: string;
  full_name: string;
  description: string;
  links: {
    html: { href: string };
  };
  language: string;
  created_on: string;
  updated_on: string;
  is_private: boolean;
}

// Unified types
export type Difficulty = 'Novice' | 'Apprentice' | 'Journeyman' | 'Expert' | 'Master';
export type ProjectStatus = 'completed' | 'in-progress' | 'legendary';
export type ProjectSource = 'github' | 'bitbucket' | 'manual';
export type ProjectRealm = 'forge' | 'workshop' | 'library';

export interface Project {
  id: string;
  source: ProjectSource;
  name: string;
  slug: string;
  description: string;
  url: string;
  homepage?: string;
  language?: string;
  technologies: string[];
  stars: number;
  forks: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  difficulty: Difficulty;
  xp: number;
  status: ProjectStatus;
  featured: boolean;
  realm: ProjectRealm;
}

export interface ProjectOverride {
  slug: string;
  title?: string;
  description?: string;
  difficulty?: Difficulty;
  xp?: number;
  status?: ProjectStatus;
  featured?: boolean;
  realm?: ProjectRealm;
  technologies?: string[];
  client?: string;
}
```

### Step 2: Create GitHub Service

Create `src/lib/github.ts`:

```typescript
import type { GitHubRepo } from '@/@types/repositories';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'alvIndieDevelop';

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`;
  
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  
  // Optional: Add token for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  
  const response = await fetch(url, {
    headers,
    next: { revalidate: 21600 }, // 6 hours
  });
  
  if (!response.ok) {
    console.error('GitHub API error:', response.status, response.statusText);
    return [];
  }
  
  const repos: GitHubRepo[] = await response.json();
  
  // Filter out forks and archived repos
  return repos.filter(repo => !repo.fork && !repo.archived);
}
```

### Step 3: Create Bitbucket Service

Create `src/lib/bitbucket.ts`:

```typescript
import type { BitbucketRepo } from '@/@types/repositories';

const BITBUCKET_API_BASE = 'https://api.bitbucket.org/2.0';
const BITBUCKET_WORKSPACE = process.env.BITBUCKET_WORKSPACE || 'alvarosh40';

interface BitbucketResponse {
  values: BitbucketRepo[];
  next?: string;
}

export async function fetchBitbucketRepos(): Promise<BitbucketRepo[]> {
  const url = `${BITBUCKET_API_BASE}/repositories/${BITBUCKET_WORKSPACE}?pagelen=100`;
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
  };
  
  // Optional: Add credentials for private repos
  if (process.env.BITBUCKET_USERNAME && process.env.BITBUCKET_APP_PASSWORD) {
    const credentials = Buffer.from(
      `${process.env.BITBUCKET_USERNAME}:${process.env.BITBUCKET_APP_PASSWORD}`
    ).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }
  
  const response = await fetch(url, {
    headers,
    next: { revalidate: 21600 }, // 6 hours
  });
  
  if (!response.ok) {
    console.error('Bitbucket API error:', response.status, response.statusText);
    return [];
  }
  
  const data: BitbucketResponse = await response.json();
  
  // Filter out private repos
  return data.values.filter(repo => !repo.is_private);
}
```

### Step 4: Create Unified Repository Service

Create `src/lib/repositories.ts`:

```typescript
import { fetchGitHubRepos } from './github';
import { fetchBitbucketRepos } from './bitbucket';
import type { 
  Project, 
  GitHubRepo, 
  BitbucketRepo, 
  Difficulty,
  ProjectOverride 
} from '@/@types/repositories';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

// Language to technologies mapping
const LANGUAGE_TECH_MAP: Record<string, string[]> = {
  'TypeScript': ['TypeScript', 'JavaScript'],
  'JavaScript': ['JavaScript'],
  'Python': ['Python'],
  'Java': ['Java'],
  'C#': ['C#', '.NET'],
  'Go': ['Go'],
  'Rust': ['Rust'],
  'PHP': ['PHP'],
  'Ruby': ['Ruby'],
};

function transformGitHubRepo(repo: GitHubRepo): Project {
  const technologies = [
    ...(repo.language ? LANGUAGE_TECH_MAP[repo.language] || [repo.language] : []),
    ...repo.topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
  ];
  
  const difficulty = calculateDifficulty(repo, technologies);
  
  return {
    id: `github-${repo.id}`,
    source: 'github',
    name: repo.name,
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: repo.description || 'No description provided',
    url: repo.html_url,
    homepage: repo.homepage || undefined,
    language: repo.language || undefined,
    technologies: [...new Set(technologies)],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isArchived: repo.archived,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    difficulty,
    xp: calculateXP(difficulty, repo.stargazers_count, technologies.length),
    status: 'completed',
    featured: false,
    realm: determineRealm(repo.topics, repo.name),
  };
}

function transformBitbucketRepo(repo: BitbucketRepo): Project {
  const technologies = repo.language 
    ? LANGUAGE_TECH_MAP[repo.language] || [repo.language]
    : [];
  
  const difficulty = calculateDifficulty(
    { stargazers_count: 0, topics: [] } as GitHubRepo, 
    technologies
  );
  
  return {
    id: `bitbucket-${repo.uuid}`,
    source: 'bitbucket',
    name: repo.name,
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: repo.description || 'No description provided',
    url: repo.links.html.href,
    language: repo.language || undefined,
    technologies,
    stars: 0,
    forks: 0,
    isArchived: false,
    createdAt: repo.created_on,
    updatedAt: repo.updated_on,
    difficulty,
    xp: calculateXP(difficulty, 0, technologies.length),
    status: 'completed',
    featured: false,
    realm: 'forge',
  };
}

function calculateDifficulty(
  repo: Pick<GitHubRepo, 'stargazers_count' | 'topics'>, 
  technologies: string[]
): Difficulty {
  let score = 0;
  
  score += Math.min(technologies.length * 10, 30);
  score += Math.min(repo.stargazers_count * 2, 20);
  
  const complexTech = ['TypeScript', 'Rust', 'Go', 'C++', 'Kubernetes', 'Docker'];
  const hasComplexTech = technologies.some(t => complexTech.includes(t));
  if (hasComplexTech) score += 15;
  
  if (score < 20) return 'Novice';
  if (score < 40) return 'Apprentice';
  if (score < 60) return 'Journeyman';
  if (score < 80) return 'Expert';
  return 'Master';
}

function calculateXP(difficulty: Difficulty, stars: number, techCount: number): number {
  const base: Record<Difficulty, number> = {
    'Novice': 50,
    'Apprentice': 100,
    'Journeyman': 200,
    'Expert': 350,
    'Master': 500,
  };
  
  return base[difficulty] + (stars * 10) + (techCount * 25);
}

function determineRealm(topics: string[], name: string): Project['realm'] {
  const workshopKeywords = ['game', 'unity', 'godot', 'unreal', 'experiment', 'demo'];
  const libraryKeywords = ['tutorial', 'guide', 'docs', 'learning', 'template'];
  
  const allKeywords = [...topics, name.toLowerCase()];
  
  if (allKeywords.some(k => workshopKeywords.some(w => k.includes(w)))) {
    return 'workshop';
  }
  if (allKeywords.some(k => libraryKeywords.some(w => k.includes(w)))) {
    return 'library';
  }
  return 'forge';
}

function loadProjectOverrides(): Map<string, ProjectOverride> {
  const overrides = new Map<string, ProjectOverride>();
  
  if (!fs.existsSync(PROJECTS_DIR)) {
    return overrides;
  }
  
  const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.mdx'));
  
  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    if (data.slug) {
      overrides.set(data.slug, data as ProjectOverride);
    }
  }
  
  return overrides;
}

function applyOverrides(projects: Project[], overrides: Map<string, ProjectOverride>): Project[] {
  return projects.map(project => {
    const override = overrides.get(project.slug);
    if (!override) return project;
    
    return {
      ...project,
      name: override.title || project.name,
      description: override.description || project.description,
      difficulty: override.difficulty || project.difficulty,
      xp: override.xp || project.xp,
      status: override.status || project.status,
      featured: override.featured ?? project.featured,
      realm: override.realm || project.realm,
      technologies: override.technologies || project.technologies,
    };
  });
}

export async function getAllProjects(): Promise<Project[]> {
  const [githubRepos, bitbucketRepos] = await Promise.all([
    fetchGitHubRepos(),
    fetchBitbucketRepos(),
  ]);
  
  const githubProjects = githubRepos.map(transformGitHubRepo);
  const bitbucketProjects = bitbucketRepos.map(transformBitbucketRepo);
  
  let allProjects = [...githubProjects, ...bitbucketProjects];
  
  // Apply MDX overrides
  const overrides = loadProjectOverrides();
  allProjects = applyOverrides(allProjects, overrides);
  
  // Sort by updated date (most recent first)
  allProjects.sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  return allProjects;
}

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

export async function getProjectsByRealm(realm: Project['realm']): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(p => p.realm === realm);
}

export async function getForgeProjects(): Promise<Project[]> {
  return getProjectsByRealm('forge');
}

export async function getWorkshopProjects(): Promise<Project[]> {
  return getProjectsByRealm('workshop');
}
```

### Step 5: Environment Variables

Add to `.env.local`:

```env
# GitHub Configuration
GITHUB_USERNAME=alvIndieDevelop
GITHUB_TOKEN=  # Optional: for higher rate limits

# Bitbucket Configuration
BITBUCKET_WORKSPACE=alvarosh40
BITBUCKET_USERNAME=  # Optional: for private repos
BITBUCKET_APP_PASSWORD=  # Optional: for private repos
```

Add to `.env.example`:

```env
# GitHub Configuration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=  # Optional: GitHub personal access token

# Bitbucket Configuration
BITBUCKET_WORKSPACE=your-bitbucket-workspace
BITBUCKET_USERNAME=  # Optional
BITBUCKET_APP_PASSWORD=  # Optional
```

### Step 6: Update Forge Page

Update `src/app/forge/page.tsx` to use dynamic data:

```typescript
import { getForgeProjects } from '@/lib/repositories';

export const revalidate = 21600; // 6 hours

export default async function ForgePage() {
  const projects = await getForgeProjects();
  // ... rest of the component
}
```

### Step 7: Update Home Page Projects

Update `src/components/sections/projects/index.tsx` to accept projects as props:

```typescript
interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects: propProjects }: ProjectsProps) {
  const projects = propProjects || fallbackProjects;
  // ... rest of the component
}
```

### Step 8: Create MDX Override Example

Create `content/projects/sailo-clone.mdx`:

```mdx
---
slug: sailo-clone-frontend
title: Sailo Clone Frontend
description: Modern frontend for boat rentals, crafted with Next.js magic
difficulty: Expert
xp: 450
status: legendary
featured: true
realm: forge
technologies:
  - Next.js
  - JavaScript
  - Material UI
  - React
client: Personal Project
---

## About This Project

A comprehensive boat rental marketplace frontend...
```

---

## Error Handling & Fallbacks

### Fallback Data

Keep the current hardcoded projects as fallback:

```typescript
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'fallback-1',
    source: 'manual',
    name: 'Flask Template',
    // ... rest of fallback data
  },
];

export async function getAllProjects(): Promise<Project[]> {
  try {
    // ... fetch logic
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return FALLBACK_PROJECTS;
  }
}
```

### Rate Limit Handling

```typescript
if (response.status === 403) {
  const rateLimitReset = response.headers.get('X-RateLimit-Reset');
  console.warn(`GitHub rate limit exceeded. Resets at: ${rateLimitReset}`);
  return FALLBACK_PROJECTS;
}
```

---

## Testing Checklist

- [ ] GitHub API returns repos correctly
- [ ] Bitbucket API returns repos correctly
- [ ] Forks are excluded
- [ ] Archived repos are excluded
- [ ] MDX overrides are applied
- [ ] Featured projects appear first
- [ ] XP calculation is reasonable
- [ ] Difficulty assignment makes sense
- [ ] Realm assignment is correct
- [ ] Fallback works when APIs fail
- [ ] ISR revalidation works
- [ ] No API rate limit issues

---

## Future Enhancements

1. **GitHub Topics as Tags**: Use GitHub topics for filtering
2. **Commit Activity**: Show recent commit activity
3. **Language Stats**: Show language breakdown per project
4. **Pinned Repos**: Respect GitHub pinned repositories
5. **README Preview**: Fetch and display README excerpts
6. **Contribution Graph**: Show contribution activity

---

*Last Updated: February 2026*
*Version: 1.0*
