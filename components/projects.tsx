"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  key_features: string[]
  github_url: string | null
  website_url: string
  ai_summary: string
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://show-case-it-05.vercel.app/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Work</h2>
            <div className="w-20 h-1 bg-primary rounded-full neon-border"></div>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Project Image */}
                  <div className={`relative overflow-hidden rounded-xl border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300 ${
                    index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                        <div className="flex gap-4">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all duration-300 neon-border"
                            >
                              <Github className="h-5 w-5 text-primary" />
                            </a>
                          )}
                          <a
                            href={project.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-all duration-300 neon-border"
                          >
                            <ExternalLink className="h-5 w-5 text-primary" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className={`space-y-6 ${
                    index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <div className="space-y-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {project.ai_summary || project.description}
                      </p>
                    </div>

                    {project.key_features && project.key_features.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {project.key_features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="text-primary mt-1 flex-shrink-0">▸</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Links for mobile */}
                    <div className="flex gap-4 lg:hidden">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 text-sm font-medium"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                      <a
                        href={project.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
