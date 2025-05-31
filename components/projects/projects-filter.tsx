"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Project } from "@/lib/types";

interface ProjectsFilterProps {
  allProjects: Project[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTechnology: string;
  setSelectedTechnology: (tech: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export default function ProjectsFilter({ 
  allProjects,
  searchTerm,
  setSearchTerm,
  selectedTechnology,
  setSelectedTechnology,
  sortBy,
  setSortBy
}: ProjectsFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const technologies = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return ["All Technologies", ...Array.from(techSet).sort()];
  }, [allProjects]);
  
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "stars", label: "Most Stars" },
    { value: "updated", label: "Recently Updated" }
  ];
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTechnology("");
    setSortBy("newest");
  };
  
  const hasActiveFilters = searchTerm || selectedTechnology || sortBy !== "newest";
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sm:w-auto w-full"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 rounded-full h-5 w-5 p-0 flex items-center justify-center">
              {(selectedTechnology ? 1 : 0) + (searchTerm ? 1 : 0) + (sortBy !== "newest" ? 1 : 0)}
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={clearFilters} 
            className="sm:w-auto w-full"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
      
      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-md bg-background">
          <div className="space-y-2">
            <label className="text-sm font-medium">Technology</label>
            <Select 
              value={selectedTechnology}
              onValueChange={setSelectedTechnology}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((tech) => (
                  <SelectItem key={tech} value={tech === "All Technologies" ? "" : tech}>
                    {tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select 
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}