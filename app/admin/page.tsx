import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Settings, 
  Star, 
  Award, 
  Github, 
  Users, 
  Activity,
  TrendingUp,
  FileText,
  Database,
  Clock,
  ChevronRight
} from "lucide-react";
import { getOptimizedGithubProjects } from "@/lib/github-optimized";
import { Project } from "@/lib/types";

export const metadata = {
  title: "Admin Dashboard | Hasrinata Arya Afendi",
  description: "Admin panel for portfolio management",
};

export default async function AdminDashboardPage() {
  // Fetch data for dashboard statistics
  let projects: Project[] = [];
  let featuredCount = 0;
  let totalStars = 0;
  
  try {
    projects = await getOptimizedGithubProjects();
    featuredCount = projects.filter(p => p.featured).length;
    totalStars = projects.reduce((sum, p) => sum + p.stars, 0);
  } catch (error) {
    console.error('Error fetching projects for admin dashboard:', error);
  }

  const recentActivity = projects
    .filter(p => {
      const lastUpdate = new Date(p.lastUpdated);
      const daysAgo = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo < 30;
    }).length;

  const topTechnologies = projects
    .reduce((acc: Record<string, number>, project) => {
      project.technologies.forEach(tech => {
        acc[tech] = (acc[tech] || 0) + 1;
      });
      return acc;
    }, {});

  const topTech = Object.entries(topTechnologies)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor your portfolio statistics and manage content
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Featured Projects</p>
                <p className="text-2xl font-bold">{featuredCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Stars</p>
                <p className="text-2xl font-bold">{totalStars}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active (30d)</p>
                <p className="text-2xl font-bold">{recentActivity}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Management Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/featured-projects">
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h3 className="font-medium">Featured Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        Kelola project yang ditampilkan di homepage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{featuredCount}/6</Badge>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              <Link href="/admin/certificates">
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Certificates</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage certificates and achievements
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Featured Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Featured Projects Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.filter(p => p.featured).slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <Github className="h-4 w-4" />
                      <div>
                        <h4 className="font-medium text-sm">{project.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {project.stars} stars • {project.technologies.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">Featured</Badge>
                  </div>
                ))}
                {featuredCount === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No featured projects selected
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics & Analytics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technology Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topTech.map(([tech, count]) => (
                  <div key={tech} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tech}</span>
                    <Badge variant="outline" className="text-xs">
                      {count} project{count !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                ))}
                {topTech.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No technology data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">API Status:</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cache:</span>
                  <Badge variant="outline" className="text-xs">10min</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portfolio Score:</span>
                  <span className="text-xs font-medium text-primary">
                    {Math.min(Math.round((totalStars + featuredCount * 10) / 10), 100)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start">
                <Link href="/projects">
                  <Github className="h-4 w-4 mr-2" />
                  View Public Projects
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/certificates">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificates
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Portfolio
                </Link>
              </Button>
            </CardContent>
          </Card>        </div>
      </div>
    </div>
  );
}
