// Silent GitHub API utilities with caching and performance optimization
import { Project } from "@/lib/types";

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

// Silent fetch with minimal logging and better error handling
async function silentFetch(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '',
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
        'Cache-Control': 'public, max-age=300', // 5 minutes cache
        ...options?.headers,
      },
    });
    
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Cache-aware fetch
async function cachedFetch(key: string, fetcher: () => Promise<any>): Promise<any> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const data = await fetcher();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  } catch (error) {
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

export async function getOptimizedGithubProjects(): Promise<Project[]> {
  return cachedFetch('github-projects', async () => {
    const username = process.env.GITHUB_USERNAME || 'Urdemonlord';
    const response = await silentFetch(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=50`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Load featured projects config
    let featuredProjectsConfig: string[] = [];
    try {
      const { readFile } = await import('fs/promises');
      const { join } = await import('path');
      const configPath = join(process.cwd(), 'lib', 'featured-projects-config.json');
      const configData = await readFile(configPath, 'utf-8');
      const config = JSON.parse(configData);
      featuredProjectsConfig = config.featuredProjects || [];
    } catch (error) {
      // Use default config if file doesn't exist
      featuredProjectsConfig = ['portfolio-website', 'portofolio_hasrinata'];
    }
    
    // Process repos with descriptions
    const processedRepos = await Promise.allSettled(
      repos.slice(0, 30).map(async (repo: any) => {
        let description = repo.description || '';
        
        // Try to get README description only if original description is empty or generic
        if (!description || description.length < 20) {
          try {
            const readmeResponse = await silentFetch(
              `https://api.github.com/repos/${repo.full_name}/readme`,
              { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            );
            
            if (readmeResponse.ok) {
              const readmeData = await readmeResponse.json();
              const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
              
              // Extract first meaningful paragraph from README
              const lines = readmeContent.split('\n').filter(line => line.trim());
              for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.length > 50 && 
                    !trimmed.startsWith('#') && 
                    !trimmed.startsWith('!') &&
                    !trimmed.startsWith('[![') &&
                    !trimmed.startsWith('```')) {
                  description = trimmed.substring(0, 200) + (trimmed.length > 200 ? '...' : '');
                  break;
                }
              }
            }
          } catch {
            // Silent fail - keep original description
          }
        }
        
        // Determine if featured
        const isFeatured = featuredProjectsConfig.includes(repo.name) || repo.stargazers_count > 10;
        
        // Extract technologies from topics and language
        const technologies = [
          ...(repo.topics || []),
          repo.language
        ].filter(Boolean);
        
        return {
          id: repo.id.toString(),
          name: repo.name,
          description: description || `${repo.name} repository`,
          technologies: technologies,
          githubUrl: repo.html_url,
          demoUrl: repo.homepage || undefined,
          stars: repo.stargazers_count || 0,
          lastUpdated: new Date(repo.updated_at).toLocaleDateString('id-ID'),
          featured: isFeatured,
          relatedCertificates: [],
        } as Project;
      })
    );
    
    return processedRepos
      .filter((result): result is PromiseFulfilledResult<Project> => result.status === 'fulfilled')
      .map(result => result.value)
      .sort((a, b) => {
        // Sort featured projects first, then by stars
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.stars - a.stars;
      });
  });
}

export async function getOptimizedGithubActivity(): Promise<any> {
  return cachedFetch('github-activity', async () => {
    const username = process.env.GITHUB_USERNAME || 'Urdemonlord';
    const response = await silentFetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`
    );
    
    if (!response.ok) {
      return { commits: 0, repositories: 0, activities: [] };
    }
    
    const events = await response.json();
    const pushEvents = events.filter((event: any) => event.type === 'PushEvent');
    
    return {
      commits: pushEvents.reduce((total: number, event: any) => 
        total + (event.payload?.commits?.length || 0), 0
      ),
      repositories: new Set(events.map((event: any) => event.repo?.name)).size,
      activities: events.slice(0, 5).map((event: any) => ({
        type: event.type,
        repo: event.repo?.name,
        created_at: event.created_at,
      })),
    };
  });
}
