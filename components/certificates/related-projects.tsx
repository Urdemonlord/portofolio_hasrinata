import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";

export default function RelatedProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col sm:flex-row">
          <div className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <h3 className="font-semibold">{project.name}</h3>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                )}
              </div>
            </CardContent>
          </div>
          <CardFooter className="flex flex-row sm:flex-col justify-end gap-2 p-4">
            <Button asChild variant="outline" size="sm">
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub <Github className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}