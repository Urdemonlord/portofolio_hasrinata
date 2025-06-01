"use client";

import { useState, useMemo } from "react";
import { Project } from "@/lib/types";
import ProjectsFilter from "./projects-filter";
import ProjectsList from "./projects-list";

interface ProjectsClientContentProps {
  allProjects: Project[];
}

export default function ProjectsClientContent({ allProjects }: ProjectsClientContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Since filtering and sorting logic is now in ProjectsList, we just pass the state
  // ProjectsList will use allProjects and the state to render.

  return (
    <>
      {/* Pass filtering state and setters to ProjectsFilter */}
      <ProjectsFilter 
        allProjects={allProjects} // Pass all projects to filter for technology list
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTechnology={selectedTechnology}
        setSelectedTechnology={setSelectedTechnology}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {/* Pass all projects and filtering state to ProjectsList */}
      {/* ProjectsList will handle its own filtering/sorting based on this state */}
      <ProjectsList 
        allProjects={allProjects}
        searchTerm={searchTerm}
        selectedTechnology={selectedTechnology}
        sortBy={sortBy}
      />
    </>
  );
} 