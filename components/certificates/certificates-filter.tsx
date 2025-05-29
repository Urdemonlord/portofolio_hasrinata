"use client";

import { useState } from "react";
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

export default function CertificatesFilter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const platforms = [
    "All Platforms",
    "Coursera", 
    "Udemy", 
    "freeCodeCamp", 
    "Codecademy", 
    "edX", 
    "Google",
    "Microsoft"
  ];
  
  const categories = [
    "All Categories",
    "Web Development", 
    "Data Science", 
    "AI/ML", 
    "DevOps", 
    "Mobile Development", 
    "Cloud Computing"
  ];
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedPlatform("");
    setSelectedCategory("");
  };
  
  const hasActiveFilters = searchTerm || selectedPlatform || selectedCategory;
  
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
        <Button 
          variant="outline" 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="sm:w-auto w-full"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary\" className="ml-2 rounded-full h-5 w-5 p-0 flex items-center justify-center">
              {(selectedPlatform ? 1 : 0) + (selectedCategory ? 1 : 0)}
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
                  <SelectItem key={platform} value={platform === "All Platforms" ? "" : platform}>
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
                  <SelectItem key={category} value={category === "All Categories" ? "" : category}>
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