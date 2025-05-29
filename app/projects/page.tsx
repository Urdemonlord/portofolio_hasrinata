import ProjectsList from "@/components/projects/projects-list";
import ProjectsFilter from "@/components/projects/projects-filter";
import { GitHubContributions } from "@/components/projects/github-contributions";

export const metadata = {
  title: "Projects | Hasrinata Arya Afendi",
  description: "Explore GitHub projects and contributions by Hasrinata Arya Afendi",
};

export default function ProjectsPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Explore my GitHub projects and contributions
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectsFilter />
          <ProjectsList />
        </div>
        <div>
          <GitHubContributions />
        </div>
      </div>
    </div>
  );
}