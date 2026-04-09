"use client"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind"],
    accent: "#915EFF",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Python", "FastAPI", "PHP", "Laravel"],
    accent: "#4F46E5",
  },
  {
    title: "AI & ML",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "scikit-learn", "YOLO", "IndoBERT", "NLP"],
    accent: "#915EFF",
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Redis"],
    accent: "#4F46E5",
  },
  {
    title: "Mobile",
    skills: ["React Native", "Expo", "Android", "iOS"],
    accent: "#915EFF",
  },
  {
    title: "IoT & Hardware",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "TinyML", "WebSockets"],
    accent: "#4F46E5",
  },
  {
    title: "DevOps & Tools",
    skills: ["Git", "Docker", "CI/CD", "Vercel", "Google Cloud", "Linux", "Nginx"],
    accent: "#915EFF",
  },
  {
    title: "Design",
    skills: ["Figma", "Adobe XD", "Photoshop", "Blender"],
    accent: "#4F46E5",
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 cyber-grid opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-20 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-[#915EFF] font-medium">
            Technical Skills
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#dfe1f6]"
            style={{ letterSpacing: "-0.03em" }}
          >
            What I work with.
          </h2>
          <div className="w-16 h-0.5 gradient-purple rounded-full" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 card-3d group glow-purple-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Category accent dot */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.accent }}
                />
                <h3 className="text-sm font-bold text-[#dfe1f6] uppercase tracking-widest group-hover:text-[#915EFF] transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <span key={si} className="tech-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
