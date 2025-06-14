import ProjectsClientContent from "@/components/projects/projects-client-content"; // Import the new client component
import { GitHubContributions } from "@/components/projects/github-contributions"; // Keep GitHubContributions if needed
import { Project } from "@/lib/types"; // Import Project type
import { getOptimizedGithubProjects, getOptimizedGithubActivity } from "@/lib/github-optimized"; // Import the github utilities (Server side)

// Re-add metadata export
export const metadata = {
  title: "Projects | Hasrinata Arya Afendi",
  description: "Explore GitHub projects and contributions by Hasrinata Arya Afendi",
};

// Make the page component async again to fetch data
export default async function ProjectsPage() {
  const [allProjects, contributionData] = await Promise.all([
    getOptimizedGithubProjects(), // Fetch all projects on the server
    getOptimizedGithubActivity() // Fetch GitHub activity data
  ]);

  return (
    <div className="container py-10 md:py-16 page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Explore my GitHub projects and contributions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Render the client component and pass the fetched data */}
          <ProjectsClientContent allProjects={allProjects} />
        </div>
        {/* Pass GitHub contributions data to the component */}
        <div>
          <GitHubContributions contributionData={contributionData} />
        </div>
      </div>
    </div>
  );
}