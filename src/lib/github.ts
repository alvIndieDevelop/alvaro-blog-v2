/**
 * GitHub API Service
 * 
 * Fetches public repositories from GitHub for a specified user.
 * Uses the GitHub REST API v3 with optional authentication for higher rate limits.
 */

import type { GitHubRepo } from '@/@types/repositories';

const GITHUB_API_BASE = 'https://api.github.com';
const DEFAULT_USERNAME = 'alvIndieDevelop';

// Cache duration: 6 hours (in seconds)
const REVALIDATE_SECONDS = 21600;

/**
 * Configuration for GitHub API requests
 */
interface GitHubConfig {
  username?: string;
  token?: string;
  excludeForks?: boolean;
  excludeArchived?: boolean;
  perPage?: number;
}

/**
 * Get GitHub configuration from environment variables
 */
function getConfig(): GitHubConfig {
  return {
    username: process.env.GITHUB_USERNAME || DEFAULT_USERNAME,
    token: process.env.GITHUB_TOKEN,
    excludeForks: true,
    excludeArchived: true,
    perPage: 100,
  };
}

/**
 * Build request headers for GitHub API
 */
function buildHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Fetch all public repositories for a GitHub user
 * 
 * @param config - Optional configuration overrides
 * @returns Array of GitHub repositories
 */
export async function fetchGitHubRepos(
  config?: Partial<GitHubConfig>
): Promise<GitHubRepo[]> {
  const finalConfig = { ...getConfig(), ...config };
  const { username, token, excludeForks, excludeArchived, perPage } = finalConfig;

  const url = new URL(`${GITHUB_API_BASE}/users/${username}/repos`);
  url.searchParams.set('type', 'owner');
  url.searchParams.set('sort', 'updated');
  url.searchParams.set('direction', 'desc');
  url.searchParams.set('per_page', String(perPage));

  try {
    const response = await fetch(url.toString(), {
      headers: buildHeaders(token),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 403) {
        const rateLimitReset = response.headers.get('X-RateLimit-Reset');
        const resetDate = rateLimitReset 
          ? new Date(parseInt(rateLimitReset) * 1000).toISOString()
          : 'unknown';
        console.error(`GitHub API rate limit exceeded. Resets at: ${resetDate}`);
        return [];
      }

      // Handle other errors
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
        `URL: ${url.toString()}`
      );
      return [];
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter repositories based on configuration
    let filteredRepos = repos;

    if (excludeForks) {
      filteredRepos = filteredRepos.filter(repo => !repo.fork);
    }

    if (excludeArchived) {
      filteredRepos = filteredRepos.filter(repo => !repo.archived);
    }

    // Log success for debugging
    console.log(
      `[GitHub] Fetched ${filteredRepos.length} repos for ${username}`,
      `(${repos.length} total, ${repos.length - filteredRepos.length} filtered)`
    );

    return filteredRepos;
  } catch (error) {
    console.error('Failed to fetch GitHub repositories:', error);
    return [];
  }
}

/**
 * Fetch a single repository by name
 * 
 * @param repoName - Repository name (not full name)
 * @param username - Optional username override
 * @returns Single GitHub repository or null
 */
export async function fetchGitHubRepo(
  repoName: string,
  username?: string
): Promise<GitHubRepo | null> {
  const config = getConfig();
  const owner = username || config.username;

  const url = `${GITHUB_API_BASE}/repos/${owner}/${repoName}`;

  try {
    const response = await fetch(url, {
      headers: buildHeaders(config.token),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`GitHub repo not found: ${owner}/${repoName}`);
        return null;
      }
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch GitHub repo ${owner}/${repoName}:`, error);
    return null;
  }
}

/**
 * Fetch repository languages breakdown
 * 
 * @param repoName - Repository name
 * @param username - Optional username override
 * @returns Object mapping language names to byte counts
 */
export async function fetchRepoLanguages(
  repoName: string,
  username?: string
): Promise<Record<string, number>> {
  const config = getConfig();
  const owner = username || config.username;

  const url = `${GITHUB_API_BASE}/repos/${owner}/${repoName}/languages`;

  try {
    const response = await fetch(url, {
      headers: buildHeaders(config.token),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch languages for ${owner}/${repoName}:`, error);
    return {};
  }
}

/**
 * Check GitHub API rate limit status
 * 
 * @returns Rate limit information or null on error
 */
export async function checkRateLimit(): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
} | null> {
  const config = getConfig();

  try {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, {
      headers: buildHeaders(config.token),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000),
    };
  } catch (error) {
    console.error('Failed to check GitHub rate limit:', error);
    return null;
  }
}
