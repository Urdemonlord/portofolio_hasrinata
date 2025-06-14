import { Project } from "@/lib/types";
import { 
  githubRateLimiter, 
  formatRepoDescription, 
  extractTechnologies, 
  calculateProjectScore 
} from "./github-utils";
import { 
  fetchGitHubRepositories, 
  fetchGitHubUserEvents,
  fetchWithRetry 
} from "./github-enhanced";

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

// Konfigurasi featured projects
let FEATURED_PROJECTS = [
  'portfolio-website',
  'portofolio_hasrinata', 
  'ai-chatbot',
  'data-analytics-dashboard',
  'e-commerce-platform',
  'mobile-app'
];

// Function to load featured projects from config file
async function loadFeaturedProjects(): Promise<string[]> {
  try {
    if (typeof window === 'undefined') {
      // Server-side: read from config file
      const { readFile } = await import('fs/promises');
      const { join } = await import('path');
      const configPath = join(process.cwd(), 'lib', 'featured-projects-config.json');
      const configData = await readFile(configPath, 'utf-8');
      const config = JSON.parse(configData);
      return config.featuredProjects || FEATURED_PROJECTS;
    } else {
      // Client-side: fetch from API
      const response = await fetch('/api/admin/featured-projects');
      if (response.ok) {
        const config = await response.json();
        return config.featuredProjects || FEATURED_PROJECTS;
      }
    }
  } catch (error) {
    console.warn('⚠️ Failed to load featured projects config, using defaults:', error);
  }
  return FEATURED_PROJECTS;
}

async function getReadmeContent(username: string, repoName: string, token?: string): Promise<string | null> {
  try {
    const url = `https://api.github.com/repos/${username}/${repoName}/readme`;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Website/1.0'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    console.log(`📖 Fetching README for ${repoName}...`);
    const response = await fetchWithRetry<any>(url, { headers });
    
    if (!response || !response.content) {
      console.warn(`⚠️ No README found for ${repoName}`);
      return null;
    }

    // Decode base64 content
    const readmeText = Buffer.from(response.content, 'base64').toString('utf-8');
    console.log(`✅ README found for ${repoName}, length: ${readmeText.length}`);

    if (!readmeText || readmeText.trim().length === 0) {
      console.warn(`⚠️ Empty README for ${repoName}`);
      return null;
    }    // Better extraction: find meaningful description
    const lines = readmeText.split('\n').filter((line: string) => line.trim() !== '');
    
    // Skip initial title lines and find the first descriptive paragraph
    let foundDescription = '';
    let skipNext = false;
    
    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();
      
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
          trimmed.toLowerCase().includes('requirements') ||
          trimmed.toLowerCase().includes('usage') ||
          trimmed.toLowerCase().includes('getting started') ||
          trimmed.toLowerCase().includes('table of contents') ||
          trimmed.toLowerCase().includes('features:') ||
          trimmed.toLowerCase().includes('technologies:') ||
          trimmed.toLowerCase().startsWith('made with') ||
          trimmed.toLowerCase().startsWith('built with')) {
        continue;
      }
      
      // Found a meaningful line - check if it's descriptive enough
      if (trimmed.length > 30 && !trimmed.match(/^[A-Z][a-z\s]+$/)) {
        foundDescription = trimmed;
        
        // Try to get the next sentence too if it's continuation
        if (i + 1 < lines.length && !foundDescription.endsWith('.') && !foundDescription.endsWith('!') && !foundDescription.endsWith('?')) {
          const nextLine = lines[i + 1].trim();
          if (nextLine && nextLine.length > 10 && !nextLine.startsWith('#') && !nextLine.startsWith('[')) {
            foundDescription += ' ' + nextLine;
          }
        }
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
        console.log(`📝 Extracted description for ${repoName}: ${firstSentence.substring(0, 100)}...`);
        return firstSentence.trim();
      }
      
      const result = cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
      console.log(`📝 Extracted description for ${repoName}: ${result.substring(0, 100)}...`);
      return result;
    }

    // If no meaningful description found, try to get first few lines
    const firstFewLines = lines.slice(0, 3).join(' ').trim();
    if (firstFewLines.length > 30) {
      const cleaned = firstFewLines
        .replace(/#+\s*/g, '') // Remove headers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .trim();
      
      if (cleaned.length > 30) {
        console.log(`📝 Using first lines as description for ${repoName}: ${cleaned.substring(0, 100)}...`);
        return cleaned.length > 200 ? cleaned.substring(0, 200) + '...' : cleaned;
      }
    }

    console.warn(`⚠️ No suitable description found in README for ${repoName}`);
    return null;
  } catch (error) {
    console.warn(`❌ Error fetching README for ${repoName}:`, error);
    return null;
  }
}

export async function getGithubProjects(): Promise<Project[]> {
  console.log('🔍 Fetching GitHub projects with enhanced retry mechanism...');
  
  try {
    // Load featured projects configuration
    const featuredProjectsConfig = await loadFeaturedProjects();
    console.log('📌 Loaded featured projects config:', featuredProjectsConfig);
    
    // Use enhanced fetch function with retry mechanism
    const repos = await fetchGitHubRepositories();
    
    if (!repos || repos.length === 0) {
      console.log('📝 No repositories found, using fallback data');
      const { mockProjects } = await import("./data/projects");
      return mockProjects;
    }

    console.log(`✅ Successfully fetched ${repos.length} repositories`);
    
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

    const username = process.env.GITHUB_USERNAME || 'Urdemonlord';
    const token = process.env.GITHUB_TOKEN;

    const projects: Project[] = await Promise.all(filteredRepos.map(async (repo: any) => {
      let description = repo.description || "";
      
      console.log(`🔍 Processing repository: ${repo.name}`);
      console.log(`📝 Original description: "${description}"`);
        // Try to get README content for better descriptions
      try {
        const readmeContent = await getReadmeContent(username, repo.name, token);
        if (readmeContent && readmeContent.trim().length > 0) {
          // Prioritas ke README content jika tersedia dan lebih baik
          if (!description || 
              description.length < 30 || 
              readmeContent.length > description.length ||
              description.toLowerCase().includes('no description') ||
              description.toLowerCase().includes('add description') ||
              description.toLowerCase().includes('created by') ||
              description === `A ${repo.language || 'software'} project`) {
            description = readmeContent;
            console.log(`✅ Using README description for ${repo.name}: "${description.substring(0, 150)}..."`);
          } else {
            console.log(`📝 Keeping original description for ${repo.name}: "${description}"`);
          }
        } else {
          console.log(`⚠️ No README content found for ${repo.name}, using original description`);
        }
      } catch (error) {
        console.warn(`❌ Error fetching README for ${repo.name}:`, error);
      }
      
      // Ensure we have a fallback description
      if (!description || description.trim().length === 0) {
        description = `A ${repo.language || 'software'} project by ${username}`;
        console.log(`🔄 Using fallback description for ${repo.name}: "${description}"`);
      }
      
      // Format description
      description = formatRepoDescription(description);
      console.log(`🎯 Final description for ${repo.name}: "${description}"`);      // Extract technologies
      const technologies = extractTechnologies(repo);

      // Determine if featured - menggunakan konfigurasi manual dan skor
      const score = calculateProjectScore(repo);
      const isManuallyFeatured = featuredProjectsConfig.includes(repo.name);
      const isHighScore = score > 100;
      const isFeatured = isManuallyFeatured || isHighScore;

      console.log(`🎯 Project ${repo.name}: Score=${score}, ManuallyFeatured=${isManuallyFeatured}, Featured=${isFeatured}`);

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

    console.log(`🎯 Successfully processed ${projects.length} projects (${projects.filter(p => p.featured).length} featured)`);
    return projects;
  } catch (error) {
    console.error('❌ Error fetching GitHub projects:', error);
    // Fallback to mock data
    console.log("📝 Falling back to mock data due to error");
    const { mockProjects } = await import("./data/projects");
    return mockProjects;
  }
}

export async function getGithubContributions(): Promise<GitHubContributionData> {
  console.log('📊 Fetching GitHub contributions with enhanced retry mechanism...');
  
  try {
    // Use enhanced fetch function with retry mechanism
    const events = await fetchGitHubUserEvents();
    
    if (!events || events.length === 0) {
      console.log('📊 No events found, returning empty contribution data');
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

    console.log(`✅ Successfully fetched ${events.length} events`);

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
        return total + (event.payload?.commits?.length || 0);
      }, 0);
      
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
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
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

    const contributionData = {
      totalContributions: pushEvents.length + pullRequestEvents.length + issueEvents.length,
      currentStreak: Math.min(currentStreak, 365), // Cap at 365 days
      longestStreak: Math.min(longestStreak, 365),
      pullRequests: pullRequestEvents.length,
      issues: issueEvents.length,
      commitsByMonth: monthsData,
      recentCommits
    };

    console.log(`📈 Successfully processed contributions: ${contributionData.totalContributions} total, ${contributionData.currentStreak} current streak`);
    return contributionData;
  } catch (error) {
    console.error('❌ Error fetching GitHub contributions:', error);
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