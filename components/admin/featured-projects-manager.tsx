"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, Github, Search, Save, RefreshCw } from "lucide-react";
import { Project } from "@/lib/types";

interface FeaturedProjectsManagerProps {
  allProjects: Project[];
}

export default function FeaturedProjectsManager({ 
  allProjects
}: FeaturedProjectsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [featuredProjects, setFeaturedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load current featured projects
  useEffect(() => {
    const currentFeatured = allProjects
      .filter(project => project.featured)
      .map(project => project.name);
    setFeaturedProjects(currentFeatured);
  }, [allProjects]);

  // Filter projects based on search
  const filteredProjects = allProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFeatured = (projectName: string, isFeatured: boolean) => {
    if (isFeatured && featuredProjects.length >= 6) {
      setMessage({ 
        type: 'error', 
        text: 'Maksimal 6 project yang bisa dijadikan featured' 
      });
      return;
    }

    setFeaturedProjects(prev => 
      isFeatured 
        ? [...prev, projectName]
        : prev.filter(name => name !== projectName)
    );
    
    // Clear any previous messages
    setMessage(null);
  };
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/featured-projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featuredProjects }),
      });

      if (!response.ok) {
        throw new Error('Failed to update featured projects');
      }

      const result = await response.json();
      setMessage({ 
        type: 'success', 
        text: `Berhasil memperbarui ${featuredProjects.length} featured projects. Refresh halaman untuk melihat perubahan.` 
      });
      
      // Optional: reload the page after a delay to show updated changes
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Gagal memperbarui featured projects' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Featured Projects Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{allProjects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{featuredProjects.length}</div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{6 - featuredProjects.length}</div>
              <div className="text-sm text-muted-foreground">Slots Available</div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleRefresh} variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              {featuredProjects.length}/6 Featured Projects
            </Badge>
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>

          {/* Messages */}
          {message && (
            <Alert className={message.type === 'error' ? 'border-red-500' : 'border-green-500'}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold truncate">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      {project.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Current Featured
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Github className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">
                      {project.technologies.slice(0, 3).join(', ')}
                      {project.technologies.length > 3 && ` +${project.technologies.length - 3}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Label htmlFor={`featured-${project.id}`} className="text-sm">
                    Featured
                  </Label>
                  <Switch
                    id={`featured-${project.id}`}
                    checked={featuredProjects.includes(project.name)}
                    onCheckedChange={(checked) => 
                      handleToggleFeatured(project.name, checked)
                    }
                    disabled={
                      !featuredProjects.includes(project.name) && 
                      featuredProjects.length >= 6
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Tidak ada project yang ditemukan dengan kata kunci {searchTerm}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
