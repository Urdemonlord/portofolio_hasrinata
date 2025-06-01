"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/types";
import ProjectCard from "./project-card";

interface ProjectsListPropsFromPage {
  allProjects: Project[];
  searchTerm: string;
  selectedTechnology: string;
  sortBy: string;
}

export default function ProjectsList({ allProjects, searchTerm, selectedTechnology, sortBy }: ProjectsListPropsFromPage) {
  
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = allProjects;

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTechnology && selectedTechnology !== "all") {
      filtered = filtered.filter(project =>
        project.technologies.includes(selectedTechnology)
      );
    }

    const sortedProjects = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return dateB - dateA;
      } else if (sortBy === "oldest") {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
        return dateA - dateB;
      } else if (sortBy === "stars") {
        return b.stars - a.stars;
      } else if (sortBy === "updated") {
        const dateA = new Date(a.lastUpdated).getTime();
        const dateB = new Date(b.lastUpdated).getTime();
         return dateB - dateA;
      }
      return 0;
    });

    return sortedProjects;
  }, [allProjects, searchTerm, selectedTechnology, sortBy]);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Showing {filteredAndSortedProjects.length} projects
      </p>
      
      <div className="space-y-6">
        {filteredAndSortedProjects.map((project, index) => (
          <div 
            key={project.id}
            className="animate-slide-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
        
        {filteredAndSortedProjects.length === 0 && (
          <p className="text-center text-muted-foreground">No projects found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}