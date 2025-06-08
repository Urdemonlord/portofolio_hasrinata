import { NextRequest, NextResponse } from 'next/server';
import { getOptimizedGithubProjects } from '@/lib/github-optimized';

export async function GET(request: NextRequest) {
  try {
    const projects = await getOptimizedGithubProjects();
    
    return NextResponse.json({
      success: true,
      projects,
      count: projects.length,
      featured: projects.filter(p => p.featured).length,
      cached: true
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch GitHub projects',
        projects: [],
        count: 0,
        featured: 0
      },
      { status: 500 }
    );
  }
}
