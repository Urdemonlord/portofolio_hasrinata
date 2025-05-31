/**
 * Test utilities for GitHub integration
 * Run these in development to verify API functionality
 */

import { getGithubProjects, getGithubContributions } from './github';

export async function testGitHubAPI() {
  console.log('🚀 Testing GitHub API Integration...');
  
  try {
    // Test projects fetching
    console.log('📁 Fetching GitHub projects...');
    const projects = await getGithubProjects();
    console.log(`✅ Successfully fetched ${projects.length} projects`);
    console.log('Featured projects:', projects.filter(p => p.featured).length);
    console.log('Top 3 projects:', projects.slice(0, 3).map(p => ({
      name: p.name,
      stars: p.stars,
      technologies: p.technologies,
      featured: p.featured
    })));

    // Test contributions fetching
    console.log('\n📊 Fetching GitHub contributions...');
    const contributions = await getGithubContributions();
    console.log('✅ Successfully fetched contribution data');
    console.log('Contribution stats:', {
      total: contributions.totalContributions,
      currentStreak: contributions.currentStreak,
      longestStreak: contributions.longestStreak,
      pullRequests: contributions.pullRequests,
      recentCommits: contributions.recentCommits.length
    });

    // Test monthly data
    console.log('\n📈 Monthly commit data:');
    contributions.commitsByMonth.forEach(month => {
      console.log(`  ${month.month}: ${month.commits} commits`);
    });

    // Test recent commits
    console.log('\n💻 Recent commits:');
    contributions.recentCommits.slice(0, 3).forEach((commit, i) => {
      console.log(`  ${i + 1}. ${commit.message.substring(0, 50)}... (${commit.repo})`);
    });

    return {
      projects,
      contributions,
      success: true
    };

  } catch (error) {
    console.error('❌ GitHub API test failed:', error);
    return {
      projects: [],
      contributions: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function testProjectFiltering() {
  console.log('🔍 Testing project filtering...');
  
  try {
    const projects = await getGithubProjects();
    
    // Test by technology
    const jsProjects = projects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes('javascript'))
    );
    console.log(`JavaScript projects: ${jsProjects.length}`);
    
    const tsProjects = projects.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes('typescript'))
    );
    console.log(`TypeScript projects: ${tsProjects.length}`);
    
    // Test by stars
    const starredProjects = projects.filter(p => p.stars > 0);
    console.log(`Projects with stars: ${starredProjects.length}`);
    
    // Test by featured
    const featuredProjects = projects.filter(p => p.featured);
    console.log(`Featured projects: ${featuredProjects.length}`);
    
    return {
      total: projects.length,
      javascript: jsProjects.length,
      typescript: tsProjects.length,
      starred: starredProjects.length,
      featured: featuredProjects.length
    };
    
  } catch (error) {
    console.error('❌ Project filtering test failed:', error);
    return null;
  }
}

// Development helper function
export function debugProject(projectName: string) {
  return getGithubProjects().then(projects => {
    const project = projects.find(p => 
      p.name.toLowerCase().includes(projectName.toLowerCase())
    );
    
    if (project) {
      console.log('🔍 Project Debug Info:');
      console.log(JSON.stringify(project, null, 2));
    } else {
      console.log(`❌ Project "${projectName}" not found`);
      console.log('Available projects:', projects.map(p => p.name));
    }
    
    return project;
  });
}
