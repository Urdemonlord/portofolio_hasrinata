"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Code, ExternalLink, Github, Star } from "lucide-react";
import { mockProjects } from "@/lib/data/projects";
import { mockCertificates } from "@/lib/data/certificates";

export default function ProjectsList() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Showing {mockProjects.length} projects
      </p>
      
      <div className="space-y-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center">
                {/* Project image would go here in a real implementation */}
                <Code className="h-10 w-10 text-muted-foreground" />
              </div>
              
              <div className="md:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  {project.relatedCertificates && project.relatedCertificates.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Related Certificates</p>
                      <div className="flex flex-wrap gap-2">
                        {project.relatedCertificates.map((certId) => {
                          const cert = mockCertificates.find(c => c.id === certId);
                          return cert ? (
                            <Link key={certId} href={`/certificates/${certId}`}>
                              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                                {cert.title}
                              </Badge>
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-end gap-4">
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
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}