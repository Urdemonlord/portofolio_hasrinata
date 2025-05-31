"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/lib/types";
import { 
  Code2, 
  Star, 
  GitFork, 
  Calendar, 
  TrendingUp,
  Award
} from "lucide-react";

interface ProjectStatsProps {
  projects: Project[];
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  // Calculate statistics
  const totalProjects = projects.length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);
  const avgStars = totalProjects > 0 ? Math.round(totalStars / totalProjects * 10) / 10 : 0;
  
  // Technology statistics
  const techCount: Record<string, number> = {};
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      techCount[tech] = (techCount[tech] || 0) + 1;
    });
  });
  
  const topTechnologies = Object.entries(techCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);
  
  const maxTechCount = Math.max(...Object.values(techCount));
  
  // Recent activity
  const recentProjects = projects
    .filter(p => {
      const lastUpdate = new Date(p.lastUpdated);
      const daysAgo = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo < 30;
    }).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Projects</p>
                <p className="text-xl font-bold">{totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Featured</p>
                <p className="text-xl font-bold">{featuredProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Stars</p>
                <p className="text-xl font-bold">{totalStars}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active (30d)</p>
                <p className="text-xl font-bold">{recentProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topTechnologies.map(([tech, count]) => (
              <div key={tech} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{tech}</span>
                  <span className="text-xs text-muted-foreground">
                    {count} project{count !== 1 ? 's' : ''}
                  </span>
                </div>
                <Progress 
                  value={(count / maxTechCount) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
          
          {Object.keys(techCount).length > 8 && (
            <div className="mt-4 pt-3 border-t">
              <div className="flex flex-wrap gap-1">
                {Object.keys(techCount)
                  .slice(8, 15)
                  .map(tech => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                {Object.keys(techCount).length > 15 && (
                  <Badge variant="secondary" className="text-xs">
                    +{Object.keys(techCount).length - 15} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Stars:</span>
                <span className="font-medium">{avgStars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Most Used Tech:</span>
                <span className="font-medium">
                  {topTechnologies[0]?.[0] || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Featured Rate:</span>
                <span className="font-medium">
                  {totalProjects > 0 ? Math.round((featuredProjects / totalProjects) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Technologies Used:</span>
                <span className="font-medium">{Object.keys(techCount).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recent Activity:</span>
                <span className="font-medium">{recentProjects} projects</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Portfolio Score:</span>
                <span className="font-medium text-primary">
                  {Math.min(Math.round((totalStars + featuredProjects * 10) / 10), 100)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
