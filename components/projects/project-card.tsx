"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { Code, ExternalLink, Github, Star, Eye, Calendar } from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);  return (
    <Card className="overflow-hidden card-hover hover-lift card-entrance">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center">
          <Code className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <div className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="line-clamp-1">{project.name}</CardTitle>
              <div className="flex items-center gap-3">
                {project.featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{project.stars}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground line-clamp-3">{project.description}</p>
              {project.description.length > 200 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Read more...
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{project.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground whitespace-pre-line">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button asChild size="sm">
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              View on GitHub <Github className="h-3.5 w-3.5 ml-1" />
                            </Link>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button asChild variant="outline" size="sm">
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo <ExternalLink className="h-3.5 w-3.5 ml-1" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Last updated: {project.lastUpdated}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
                {project.technologies.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              {project.demoUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Demo
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="sm">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5 mr-1" />
                    GitHub
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
