"use client"

import { useState, useEffect } from "react"
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
        const response = await fetch("https://show-case-it-05.vercel.app/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-6 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-[#915EFF] font-medium">Portfolio</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#dfe1f6]"
            style={{ letterSpacing: "-0.03em" }}
          >
            My Work.
          </h2>
          <div className="w-16 h-0.5 gradient-purple rounded-full" />
        </div>
        <p className="text-[#ccc3d7] text-lg mb-16 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Setiap proyek mencerminkan kemampuan problem-solving, keahlian teknis, dan passion dalam membangun pengalaman digital yang seamless.
        </p>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-[#262939]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[#262939] rounded w-3/4" />
                  <div className="h-3 bg-[#262939] rounded" />
                  <div className="h-3 bg-[#262939] rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="text-red-400">Gagal memuat data: {error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card rounded-2xl overflow-hidden card-3d group glow-purple-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, rgba(145, 94, 255, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)`,
                      }}
                    >
                      <span className="text-4xl font-bold gradient-text-purple opacity-50">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Overlay with links on hover */}
                  <div className="absolute inset-0 bg-[#0f1321]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl glass-card flex items-center justify-center text-[#dfe1f6] hover:text-[#915EFF] transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    <a
                      href={project.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl gradient-purple flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#dfe1f6] group-hover:text-[#915EFF] transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#ccc3d7] leading-relaxed line-clamp-2">
                    {project.ai_summary || project.description}
                  </p>

                  {/* Key Features */}
                  {project.key_features && project.key_features.length > 0 && (
                    <ul className="space-y-1">
                      {project.key_features.slice(0, 2).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#ccc3d7]">
                          <span className="text-[#915EFF] mt-0.5 flex-shrink-0">▸</span>
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span key={i} className="tech-chip">
                        #{tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tech-chip">+{project.tags.length - 4}</span>
                    )}
                  </div>

                  {/* Links (mobile visible) */}
                  <div className="flex gap-3 pt-2 md:hidden">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-[#ccc3d7] border border-[#4a4455] hover:border-[#915EFF]/40 transition-colors"
                      >
                        <Github className="h-3 w-3" /> Code
                      </a>
                    )}
                    <a
                      href={project.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium gradient-purple text-white"
                    >
                      <ExternalLink className="h-3 w-3" /> Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
