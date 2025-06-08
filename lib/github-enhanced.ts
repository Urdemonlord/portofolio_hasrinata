// Enhanced GitHub API utility with retry mechanism and fallback data

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  timeout?: number;
}

// Mock/fallback data untuk saat GitHub API tidak tersedia
export const mockRepositories = [
  {
    id: 1,
    name: "portfolio-website",
    full_name: "Urdemonlord/portfolio-website",
    description: "Personal portfolio website built with Next.js and TypeScript",
    html_url: "https://github.com/Urdemonlord/portfolio-website",
    language: "TypeScript",
    stargazers_count: 15,
    forks_count: 3,
    updated_at: "2024-06-01T10:30:00Z",
    topics: ["nextjs", "typescript", "portfolio", "react"],
    private: false
  },
  {
    id: 2,
    name: "ai-chatbot",
    full_name: "Urdemonlord/ai-chatbot",
    description: "AI-powered chatbot using OpenAI API and React",
    html_url: "https://github.com/Urdemonlord/ai-chatbot",
    language: "JavaScript",
    stargazers_count: 8,
    forks_count: 2,
    updated_at: "2024-05-28T14:20:00Z",
    topics: ["ai", "chatbot", "openai", "react"],
    private: false
  },
  {
    id: 3,
    name: "data-analytics-dashboard",
    full_name: "Urdemonlord/data-analytics-dashboard",
    description: "Data visualization dashboard with Chart.js and D3.js",
    html_url: "https://github.com/Urdemonlord/data-analytics-dashboard",
    language: "Python",
    stargazers_count: 12,
    forks_count: 5,
    updated_at: "2024-05-25T09:15:00Z",
    topics: ["data-visualization", "chartjs", "d3js", "analytics"],
    private: false
  }
];

export const mockUserEvents = [
  {
    id: "1",
    type: "PushEvent",
    repo: { name: "Urdemonlord/portfolio-website" },
    created_at: "2024-06-01T10:30:00Z",
    payload: {
      commits: [
        { message: "Add authentication system with JWT" }
      ]
    }
  },
  {
    id: "2",
    type: "CreateEvent",
    repo: { name: "Urdemonlord/ai-chatbot" },
    created_at: "2024-05-28T14:20:00Z",
    payload: {
      ref_type: "repository"
    }
  },
  {
    id: "3",
    type: "IssuesEvent",
    repo: { name: "Urdemonlord/data-analytics-dashboard" },
    created_at: "2024-05-25T09:15:00Z",
    payload: {
      action: "opened",
      issue: {
        title: "Add real-time data updates",
        number: 15
      }
    }
  }
];

// Enhanced fetch with retry mechanism
export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryOptions: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    timeout = 10000
  } = retryOptions;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempting GitHub API request (${attempt + 1}/${maxRetries + 1}): ${url}`);
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website/1.0',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
          throw new Error('GitHub API rate limit exceeded');
        }
        if (response.status >= 500) {
          throw new Error(`GitHub API server error: ${response.status}`);
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ GitHub API request successful: ${url}`);
      return data;
    } catch (error) {
      console.warn(`⚠️ GitHub API request failed (attempt ${attempt + 1}):`, error);
      
      if (attempt === maxRetries) {
        console.error(`❌ GitHub API request failed after ${maxRetries + 1} attempts:`, error);
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
      console.log(`⏳ Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Unexpected end of retry loop');
}

// Enhanced GitHub API functions with fallback
export async function fetchGitHubRepositories(): Promise<any[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.warn('⚠️ GITHUB_USERNAME not found, using mock data');
    return mockRepositories;
  }

  try {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`;
    const headers: Record<string, string> = {};
      if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const repos = await fetchWithRetry<any[]>(url, { headers });
    
    if (!Array.isArray(repos)) {
      console.warn('📝 Invalid repository data format, using fallback data');
      return mockRepositories;
    }
    
    // Filter out forked repos and private repos for public display
    return repos.filter((repo: any) => !repo.fork && !repo.private);
  } catch (error) {
    console.error('🚨 Failed to fetch GitHub repositories, using fallback data:', error);
    return mockRepositories;
  }
}

export async function fetchGitHubUserEvents(): Promise<any[]> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.warn('⚠️ GITHUB_USERNAME not found, using mock data');
    return mockUserEvents;
  }

  try {
    const url = `https://api.github.com/users/${username}/events/public?per_page=100`;    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const events = await fetchWithRetry<any[]>(url, { headers });
    
    if (!Array.isArray(events)) {
      console.warn('📝 Invalid events data format, using fallback data');
      return mockUserEvents;
    }
    
    return events;
  } catch (error) {
    console.error('🚨 Failed to fetch GitHub user events, using fallback data:', error);
    return mockUserEvents;
  }
}

// Enhanced repository fetching with caching
export async function fetchRepositoriesWithCache(): Promise<any[]> {
  try {
    const repos = await fetchGitHubRepositories();
    
    // Cache the successful result
    if (typeof window !== 'undefined') {
      localStorage.setItem('github_repos_cache', JSON.stringify({
        data: repos,
        timestamp: Date.now()
      }));
    }
    
    return repos;
  } catch (error) {
    // Try to use cached data if available
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('github_repos_cache');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isStale = Date.now() - timestamp > 30 * 60 * 1000; // 30 minutes
        
        if (!isStale) {
          console.log('📦 Using cached GitHub repositories');
          return data;
        }
      }
    }
    
    console.log('🔄 Using mock GitHub repositories');
    return mockRepositories;
  }
}

// Utility to check GitHub API status
export async function checkGitHubAPIStatus(): Promise<boolean> {
  try {
    await fetchWithRetry('https://api.github.com/rate_limit', {}, { maxRetries: 1, timeout: 5000 });
    return true;
  } catch (error) {
    console.warn('⚠️ GitHub API is not accessible:', error);
    return false;
  }
}
