// Utility functions for GitHub API optimization

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function memoize<T extends (...args: any[]) => any>(
  func: T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): T {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.value;
    }
    
    const result = func(...args);
    cache.set(key, { value: result, timestamp: Date.now() });
    
    // Clean up old entries
    if (cache.size > 100) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }
    
    return result;
  }) as T;
}

export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests: number = 60, timeWindowMs: number = 60 * 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  async checkLimit(): Promise<boolean> {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.timeWindow - (now - oldestRequest);
      
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return this.checkLimit();
      }
    }
    
    this.requests.push(now);
    return true;
  }
}

export const githubRateLimiter = new RateLimiter();

export function formatRepoDescription(description: string | null, maxLength: number = 200): string {
  if (!description) return "No description provided.";
  
  // Clean up common patterns
  const cleaned = description
    .replace(/^\s*#+\s*/, '') // Remove leading hashtags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
    .replace(/`([^`]+)`/g, '$1') // Remove code backticks
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
    .replace(/^\s*>\s*/, '') // Remove blockquotes
    .trim();
  
  if (cleaned.length <= maxLength) return cleaned;
  
  // Try to break at a sentence boundary
  const sentences = cleaned.split(/[.!?]+/);
  let result = sentences[0];
  
  for (let i = 1; i < sentences.length; i++) {
    const next = result + '.' + sentences[i];
    if (next.length > maxLength) break;
    result = next;
  }
  
  return result.length > maxLength 
    ? cleaned.substring(0, maxLength - 3) + '...'
    : result + (result.endsWith('.') ? '' : '.');
}

export function extractTechnologies(repo: any): string[] {
  const technologies: string[] = [];
  
  // Add primary language
  if (repo.language) {
    technologies.push(repo.language);
  }
  
  // Add topics (GitHub repository topics)
  if (repo.topics && Array.isArray(repo.topics)) {
    technologies.push(...repo.topics.slice(0, 6)); // Limit to 6 topics
  }
    // Remove duplicates and common non-tech topics
  const filtered = Array.from(new Set(technologies))
    .filter(tech => {
      const lower = tech.toLowerCase();
      return !['readme', 'license', 'docs', 'documentation', 'portfolio', 'project'].includes(lower);
    })
    .slice(0, 8); // Limit total technologies
  
  return filtered;
}

export function calculateProjectScore(repo: any): number {
  let score = 0;
  
  // Base score from stars
  score += repo.stargazers_count * 10;
  
  // Boost for recent activity
  const lastUpdate = new Date(repo.updated_at);
  const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate < 30) score += 50;
  else if (daysSinceUpdate < 90) score += 25;
  
  // Boost for having a description
  if (repo.description && repo.description.length > 20) score += 20;
  
  // Boost for having topics
  if (repo.topics && repo.topics.length > 0) score += 15;
  
  // Boost for having a homepage/demo
  if (repo.homepage) score += 25;
  
  // Boost for popular languages
  const popularLanguages = ['TypeScript', 'JavaScript', 'Python', 'React', 'Next.js'];
  if (repo.language && popularLanguages.includes(repo.language)) score += 30;
  
  // Penalty for forks (unless they have significant activity)
  if (repo.fork && repo.stargazers_count < 5) score -= 100;
  
  return score;
}
