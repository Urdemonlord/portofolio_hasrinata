import { Project } from "@/lib/types";
import { 
  githubRateLimiter, 
  formatRepoDescription, 
  extractTechnologies, 
  calculateProjectScore 
} from "./github-utils";

// Helper function for resilient fetch with retries
async function resilientFetch(url: string, options: RequestInit, timeoutMs: number = 10000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export interface GitHubContributionData {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  pullRequests: number;
  issues: number;
  commitsByMonth: Array<{ month: string; commits: number }>;
  recentCommits: Array<{
    message: string;
    repo: string;
    date: string;
    sha: string;
  }>;
}

async function getReadmeContent(username: string, repoName: string, token?: string): Promise<string | null> {
  try {
    const res = await resilientFetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
      headers: token ? {
        Authorization: `token ${token}`,
        'Accept': 'application/vnd.github.v3.raw' // Request raw content
      } : {
        'Accept': 'application/vnd.github.v3.raw'
      },
      next: { revalidate: 3600 },
    }, 5000);

    if (!res.ok) {
      return null;
    }

    // If requesting raw content, no base64 decode needed
    const readmeText = await res.text();

    // Better extraction: find meaningful description
    const lines = readmeText.split('\n').filter(line => line.trim() !== '');
    
    // Skip initial title lines and find the first descriptive paragraph
    let foundDescription = '';
    let skipHeaders = true;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines, headers, badges, and other metadata
      if (!trimmed || 
          trimmed.startsWith('#') || 
          trimmed.startsWith('[![') ||
          trimmed.startsWith('![') ||
          trimmed.startsWith('```') ||
          trimmed.startsWith('- ') || 
          trimmed.startsWith('* ') || 
          trimmed.startsWith('+ ') ||
          trimmed.match(/^\s*[0-9]+\.\s/) ||
          trimmed.startsWith('>') ||
          trimmed.toLowerCase().includes('license') ||
          trimmed.toLowerCase().includes('installation') ||
          trimmed.toLowerCase().includes('usage') ||
          trimmed.toLowerCase().includes('getting started')) {
        continue;
      }
      
      // Found a meaningful line
      if (trimmed.length > 20) {
        foundDescription = trimmed;
        break;
      }
    }
    
    if (foundDescription) {
      // Clean up and limit length
      const cleaned = foundDescription
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/`([^`]+)`/g, '$1') // Remove code backticks
        .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
        .trim();
      
      // Return first sentence or truncate at reasonable length
      const firstSentence = cleaned.match(/[^.!?]*[.!?]/)?.[0];
      if (firstSentence && firstSentence.length > 10) {
        return firstSentence.trim();
      }
      
      return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
    }

    return null;
  } catch (error) {
    console.warn(`Error fetching README for ${repoName}:`, error);
    return null;
  }
}

export async function getGithubProjects(): Promise<Project[]> {
  const username = process.env.GITHUB_USERNAME || 'Urdemonlord'; // Default fallback
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.error("GITHUB_USERNAME environment variable is not set.");
    // Import mock data as fallback
    const { mockProjects } = await import("./data/projects");
    return mockProjects;
  }  try {
    // Check rate limit before making request
    await githubRateLimiter.checkLimit();
    
    const res = await resilientFetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`, {
      headers: token ? {
        Authorization: `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      } : {
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 3600 },    }, 10000);

    if (!res.ok) {
      const err = await res.text();
      console.error("GitHub API Error:", res.status, err);
      // Fallback to mock data
      console.log("Falling back to mock data");
      const { mockProjects } = await import("./data/projects");
      return mockProjects;
    }

    const repos = await res.json();
    
    // Process repos with improved logic
    const projectsWithScores: Array<{ repo: any; score: number }> = repos.map((repo: any) => {
      const score = calculateProjectScore(repo);
      return { repo, score };
    });

    // Filter out low-quality projects
    const filteredRepos = projectsWithScores
      .filter(({ score }: { score: number }) => score > -50) // Filter out very low quality
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score) // Sort by score
      .slice(0, 50) // Limit to top 50 projects
      .map(({ repo }: { repo: any }) => repo);

    const projects: Project[] = await Promise.all(filteredRepos.map(async (repo: any) => {
      let description = repo.description || "No description provided.";
      
      // Try to get README content for better descriptions
      const readmeContent = await getReadmeContent(username, repo.name, token);
      if (readmeContent && readmeContent.length > description.length) {
        description = readmeContent;
      }
      
      // Format description
      description = formatRepoDescription(description);

      // Extract technologies
      const technologies = extractTechnologies(repo);

      // Determine if featured
      const score = calculateProjectScore(repo);
      const isFeatured = score > 100;

      return {
        id: repo.id.toString(),
        name: repo.name,
        description: description,
        technologies: technologies,
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        stars: repo.stargazers_count,
        lastUpdated: new Date(repo.updated_at).toLocaleDateString('id-ID'),
        featured: isFeatured,
        relatedCertificates: [],
      } as Project;
    }));
    
    // Sort featured projects first, then by score
    projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.stars - a.stars; // Sort by stars within same featured status
    });

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Fallback to mock data
    console.log("Falling back to mock data due to error");
    const { mockProjects } = await import("./data/projects");
    return mockProjects;
  }
}

export async function getGithubContributions(): Promise<GitHubContributionData> {
  const username = process.env.GITHUB_USERNAME || 'Urdemonlord';
  const token = process.env.GITHUB_TOKEN;

  try {
    // Get user events (public activity)
    const eventsRes = await resilientFetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers: token ? {
        Authorization: `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      } : {
        'Accept': 'application/vnd.github.v3+json'      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    }, 8000);

    let events = [];
    if (eventsRes.ok) {
      events = await eventsRes.json();
    }    // Get user stats
    const userRes = await resilientFetch(`https://api.github.com/users/${username}`, {
      headers: token ? {
        Authorization: `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      } : {
        'Accept': 'application/vnd.github.v3+json'
      },
      next: { revalidate: 3600 },
    }, 8000);

    let userStats = {};
    if (userRes.ok) {
      userStats = await userRes.json();
    }

    // Process events to calculate contributions
    const pushEvents = events.filter((event: any) => event.type === 'PushEvent');
    const pullRequestEvents = events.filter((event: any) => event.type === 'PullRequestEvent');
    const issueEvents = events.filter((event: any) => event.type === 'IssuesEvent');

    // Calculate commits by month (last 6 months)
    const now = new Date();
    const monthsData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = monthNames[date.getMonth()];
      const monthEvents = pushEvents.filter((event: any) => {
        const eventDate = new Date(event.created_at);
        return eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
      });
      
      const commits = monthEvents.reduce((total: number, event: any) => {
        return total + (event.payload?.commits?.length || 0);      }, 0);
      
      monthsData.push({ month: monthName, commits });
    }

    // Calculate streaks (simplified approach)
    const commitDates: string[] = pushEvents.map((event: any) => new Date(event.created_at).toDateString());
    const uniqueDates = Array.from(new Set(commitDates)).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Calculate current streak from today backwards
    const today = new Date();
    let checkDate = new Date(today);
    
    for (let i = 0; i < 365; i++) { // Check last 365 days
      const dateStr = checkDate.toDateString();
      if (uniqueDates.includes(dateStr)) {
        if (i === currentStreak) {
          currentStreak++;
        }
        tempStreak++;
      } else {
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
        if (i === currentStreak) {
          break; // Stop counting current streak
        }
        tempStreak = 0;
      }
      checkDate.setDate(checkDate.getDate() - 1);    }
    
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }

    // Recent commits (improved)
    const recentCommits = pushEvents.slice(0, 5).map((event: any) => {
      const commits = event.payload?.commits || [];
      const firstCommit = commits[0];
      return {
        message: firstCommit?.message || 'Push to repository',
        repo: event.repo?.name?.split('/')[1] || 'Unknown repo',
        date: new Date(event.created_at).toLocaleDateString('id-ID'),
        sha: firstCommit?.sha?.substring(0, 7) || 'unknown'
      };
    });

    return {
      totalContributions: pushEvents.length + pullRequestEvents.length + issueEvents.length,
      currentStreak: Math.min(currentStreak, 365), // Cap at 365 days
      longestStreak: Math.min(longestStreak, 365),
      pullRequests: pullRequestEvents.length,
      issues: issueEvents.length,
      commitsByMonth: monthsData,
      recentCommits
    };
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    // Return fallback data
    return {
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      pullRequests: 0,
      issues: 0,
      commitsByMonth: [],
      recentCommits: []
    };
  }
}