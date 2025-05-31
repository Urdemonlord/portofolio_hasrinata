import { ProjectsSkeleton, GitHubContributionsSkeleton } from "@/components/projects/loading-skeletons";

export default function ProjectsLoading() {
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
          <ProjectsSkeleton />
        </div>
        <div>
          <GitHubContributionsSkeleton />
        </div>
      </div>
    </div>
  );
}
