"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ExternalLink, Github, Star, RefreshCw, Info } from "lucide-react";
import { Project } from "@/lib/types";

interface FeaturedProjectsClientProps {
  initialProjects: Project[];
}

export default function FeaturedProjectsClient({ initialProjects }: FeaturedProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch by ensuring client-side only for dynamic content
  useEffect(() => {
    setIsClient(true);
    setLastUpdated(new Date());
  }, []);

  // Function to refresh featured projects
  const refreshProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/featured-projects');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProjects(data.projects);
          setLastUpdated(new Date());
        }
      }
    } catch (error) {
      console.error('Error refreshing featured projects:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // Auto-refresh every 5 minutes only on client
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(refreshProjects, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isClient]);

  const projectsToDisplay = projects.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsToDisplay.map((project, index) => (
          <Card 
            key={project.id} 
            className="flex flex-col h-full card-hover hover-lift animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{project.stars}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                  <Github className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <CardTitle className="mt-2 line-clamp-2">{project.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4">
              {project.demoUrl && (
                <Button asChild variant="ghost" size="sm">
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    Demo <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="sm">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub <Github className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>      {/* Status Information */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          <span>Showing {projectsToDisplay.length} featured projects</span>
        </div>
        {isClient && lastUpdated && (
          <div className="flex items-center gap-2">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={refreshProjects}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {projectsToDisplay.length === 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No featured projects configured. Visit the admin panel to select featured projects.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
