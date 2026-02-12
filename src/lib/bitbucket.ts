/**
 * Bitbucket API Service
 * 
 * Fetches public repositories from Bitbucket Cloud for a specified workspace.
 * Uses the Bitbucket REST API 2.0.
 */

import type { BitbucketRepo, BitbucketResponse } from '@/@types/repositories';

const BITBUCKET_API_BASE = 'https://api.bitbucket.org/2.0';
const DEFAULT_WORKSPACE = 'alvarosh40';

// Cache duration: 6 hours (in seconds)
const REVALIDATE_SECONDS = 21600;

/**
 * Configuration for Bitbucket API requests
 */
interface BitbucketConfig {
  workspace?: string;
  username?: string;
  appPassword?: string;
  excludePrivate?: boolean;
  pageLen?: number;
}

/**
 * Get Bitbucket configuration from environment variables
 */
function getConfig(): BitbucketConfig {
  return {
    workspace: process.env.BITBUCKET_WORKSPACE || DEFAULT_WORKSPACE,
    username: process.env.BITBUCKET_USERNAME,
    appPassword: process.env.BITBUCKET_APP_PASSWORD,
    excludePrivate: true,
    pageLen: 100,
  };
}

/**
 * Build request headers for Bitbucket API
 */
function buildHeaders(username?: string, appPassword?: string): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/json',
  };

  // Add Basic Auth if credentials are provided
  if (username && appPassword) {
    const credentials = Buffer.from(`${username}:${appPassword}`).toString('base64');
    headers['Authorization'] = `Basic ${credentials}`;
  }

  return headers;
}

/**
 * Fetch all public repositories for a Bitbucket workspace
 * 
 * @param config - Optional configuration overrides
 * @returns Array of Bitbucket repositories
 */
export async function fetchBitbucketRepos(
  config?: Partial<BitbucketConfig>
): Promise<BitbucketRepo[]> {
  const finalConfig = { ...getConfig(), ...config };
  const { workspace, username, appPassword, excludePrivate, pageLen } = finalConfig;

  const url = new URL(`${BITBUCKET_API_BASE}/repositories/${workspace}`);
  url.searchParams.set('pagelen', String(pageLen));
  url.searchParams.set('sort', '-updated_on'); // Sort by most recently updated

  try {
    const response = await fetch(url.toString(), {
      headers: buildHeaders(username, appPassword),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        console.error('Bitbucket API authentication failed. Check credentials.');
        return [];
      }

      // Handle not found (workspace doesn't exist)
      if (response.status === 404) {
        console.error(`Bitbucket workspace not found: ${workspace}`);
        return [];
      }

      // Handle other errors
      console.error(
        `Bitbucket API error: ${response.status} ${response.statusText}`,
        `URL: ${url.toString()}`
      );
      return [];
    }

    const data: BitbucketResponse = await response.json();
    let repos = data.values;

    // Filter out private repositories if configured
    if (excludePrivate) {
      repos = repos.filter(repo => !repo.is_private);
    }

    // Log success for debugging
    console.log(
      `[Bitbucket] Fetched ${repos.length} repos for ${workspace}`,
      `(${data.values.length} total, ${data.values.length - repos.length} filtered)`
    );

    return repos;
  } catch (error) {
    console.error('Failed to fetch Bitbucket repositories:', error);
    return [];
  }
}

/**
 * Fetch all pages of repositories (handles pagination)
 * 
 * @param config - Optional configuration overrides
 * @returns Array of all Bitbucket repositories across all pages
 */
export async function fetchAllBitbucketRepos(
  config?: Partial<BitbucketConfig>
): Promise<BitbucketRepo[]> {
  const finalConfig = { ...getConfig(), ...config };
  const { workspace, username, appPassword, excludePrivate, pageLen } = finalConfig;

  const allRepos: BitbucketRepo[] = [];
  let nextUrl: string | null = `${BITBUCKET_API_BASE}/repositories/${workspace}?pagelen=${pageLen}&sort=-updated_on`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: buildHeaders(username, appPassword),
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (!response.ok) {
        console.error(`Bitbucket API error: ${response.status} ${response.statusText}`);
        break;
      }

      const data: BitbucketResponse = await response.json();
      allRepos.push(...data.values);
      nextUrl = data.next || null;

      // Safety limit to prevent infinite loops
      if (allRepos.length > 500) {
        console.warn('Bitbucket: Reached safety limit of 500 repos');
        break;
      }
    }

    // Filter out private repositories if configured
    let filteredRepos = allRepos;
    if (excludePrivate) {
      filteredRepos = allRepos.filter(repo => !repo.is_private);
    }

    console.log(
      `[Bitbucket] Fetched ${filteredRepos.length} total repos for ${workspace}`
    );

    return filteredRepos;
  } catch (error) {
    console.error('Failed to fetch all Bitbucket repositories:', error);
    return allRepos; // Return what we have so far
  }
}

/**
 * Fetch a single repository by slug
 * 
 * @param repoSlug - Repository slug
 * @param workspace - Optional workspace override
 * @returns Single Bitbucket repository or null
 */
export async function fetchBitbucketRepo(
  repoSlug: string,
  workspace?: string
): Promise<BitbucketRepo | null> {
  const config = getConfig();
  const ws = workspace || config.workspace;

  const url = `${BITBUCKET_API_BASE}/repositories/${ws}/${repoSlug}`;

  try {
    const response = await fetch(url, {
      headers: buildHeaders(config.username, config.appPassword),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Bitbucket repo not found: ${ws}/${repoSlug}`);
        return null;
      }
      console.error(`Bitbucket API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch Bitbucket repo ${ws}/${repoSlug}:`, error);
    return null;
  }
}

/**
 * Get the main branch name for a repository
 * 
 * @param repoSlug - Repository slug
 * @param workspace - Optional workspace override
 * @returns Main branch name or 'main' as default
 */
export async function getMainBranch(
  repoSlug: string,
  workspace?: string
): Promise<string> {
  const repo = await fetchBitbucketRepo(repoSlug, workspace);
  return repo?.mainbranch?.name || 'main';
}
