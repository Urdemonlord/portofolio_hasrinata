"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
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

interface CertificatesFilterProps {
  onFilterChange: (filters: { searchTerm: string; platform: string; category: string }) => void;
  onSortChange: (sortBy: string) => void;
}

function CertificatesFilter({ onFilterChange, onSortChange }: CertificatesFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Memoize static data arrays to prevent re-creation on every render
  const platforms = useMemo(() => [
    "All Platforms",
    "Dicoding",
    "Oracle",
    "Cisco",
    "Microsoft",
    "Google",
    "AWS",
    "GitHub",
    "Coursera",
    "edX",
    "Udemy",
    "Robotics Competition"
  ], []);
  
  const categories = useMemo(() => [
    "All Categories",
    "Programming", 
    "Web Development", 
    "Frontend Development", 
    "Backend Development", 
    "Mobile Development", 
    "DevOps", 
    "Cloud Computing",
    "Version Control",
    "Robotics",
    "Software Engineering"
  ], []);
  
  // Optimize filter clearing with useCallback
  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedPlatform("all");
    setSelectedCategory("all");
  }, []);
  
  // Effect to notify parent component of filter changes with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({
        searchTerm,
        platform: selectedPlatform || "all",
        category: selectedCategory || "all"
      });
    }, 150); // 150ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedPlatform, selectedCategory, onFilterChange]);

  // Effect to notify parent component of sort changes
  useEffect(() => {
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);
  
  const hasActiveFilters = useMemo(() => 
    searchTerm || (selectedPlatform && selectedPlatform !== "all") || (selectedCategory && selectedCategory !== "all"),
    [searchTerm, selectedPlatform, selectedCategory]
  );
  
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search certificates..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="platform">Sort by Platform</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="sm:w-auto w-full"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 rounded-full h-5 w-5 p-0 flex items-center justify-center">
                {(selectedPlatform && selectedPlatform !== "all" ? 1 : 0) + (selectedCategory && selectedCategory !== "all" ? 1 : 0)}
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
      </div>
      
      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-md bg-background">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Select 
              value={selectedPlatform} 
              onValueChange={setSelectedPlatform}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform === "All Platforms" ? "all" : platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category === "All Categories" ? "all" : category}>
                    {category}
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

export default memo(CertificatesFilter);