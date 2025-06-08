import { NextRequest, NextResponse } from 'next/server';
import { getOptimizedGithubProjects } from '@/lib/github-optimized';

export async function GET(request: NextRequest) {
  try {
    const projects = await getOptimizedGithubProjects();
    const featuredProjects = projects.filter(project => project.featured);
    
    return NextResponse.json({
      success: true,
      projects: featuredProjects,
      count: featuredProjects.length,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured projects',
        projects: [],
        count: 0
      },
      { status: 500 }
    );
  }
}
