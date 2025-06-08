import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

// Path to store featured projects configuration
const CONFIG_PATH = join(process.cwd(), 'lib', 'featured-projects-config.json');

export async function GET() {
  try {
    const configData = await readFile(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(configData);
    return NextResponse.json(config);
  } catch (error) {
    // Return default configuration if file doesn't exist
    const defaultConfig = {
      featuredProjects: [
        'portfolio-website',
        'portofolio_hasrinata', 
        'ai-chatbot',
        'data-analytics-dashboard'
      ],
      lastUpdated: new Date().toISOString()
    };
    return NextResponse.json(defaultConfig);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { featuredProjects } = await request.json();
    
    if (!Array.isArray(featuredProjects)) {
      return NextResponse.json(
        { error: 'featuredProjects must be an array' },
        { status: 400 }
      );
    }

    if (featuredProjects.length > 6) {
      return NextResponse.json(
        { error: 'Maximum 6 featured projects allowed' },
        { status: 400 }
      );
    }

    const config = {
      featuredProjects,
      lastUpdated: new Date().toISOString()
    };

    await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));

    // Also update the github.ts file with new configuration
    await updateGithubConfig(featuredProjects);

    return NextResponse.json({ 
      success: true, 
      message: 'Featured projects updated successfully',
      config 
    });
  } catch (error) {
    console.error('Error updating featured projects:', error);
    return NextResponse.json(
      { error: 'Failed to update featured projects' },
      { status: 500 }
    );
  }
}

async function updateGithubConfig(featuredProjects: string[]) {
  try {
    const githubPath = join(process.cwd(), 'lib', 'github.ts');
    let githubContent = await readFile(githubPath, 'utf-8');
    
    // Update the FEATURED_PROJECTS array in the github.ts file
    const newFeaturedArray = `const FEATURED_PROJECTS = [
${featuredProjects.map(project => `  '${project}'`).join(',\n')}
];`;
    
    // Replace the existing FEATURED_PROJECTS array
    githubContent = githubContent.replace(
      /const FEATURED_PROJECTS = \[[\s\S]*?\];/,
      newFeaturedArray
    );
    
    await writeFile(githubPath, githubContent);
    console.log('✅ Updated FEATURED_PROJECTS in github.ts');
  } catch (error) {
    console.error('❌ Failed to update github.ts:', error);
    throw error;
  }
}
