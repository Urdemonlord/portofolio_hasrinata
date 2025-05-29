"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, Github, Star } from "lucide-react";
import { mockProjects } from "@/lib/data/projects";

export default function FeaturedProjects() {
  // Display only the 3 featured projects
  const featuredProjects = mockProjects
    .filter(project => project.featured)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProjects.map((project) => (
        <Card key={project.id} className="flex flex-col h-full transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">{project.stars}</span>
              </div>
              <Github className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle className="mt-2 line-clamp-2">{project.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button asChild variant="ghost" size="sm">
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