"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Mobile Development",
    skills: ["Flutter", "React Native", "Kotlin", "Android", "iOS"],
    icon: "📱",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind"],
    icon: "🎨",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "NestJS", "Laravel", "PHP", ".NET", "Python", "FastAPI"],
    icon: "⚙️",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Redis", "Supabase"],
    icon: "🗄️",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "AI & ML",
    skills: ["TensorFlow", "PyTorch", "OpenCV", "scikit-learn", "YOLO", "NLP"],
    icon: "🤖",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    title: "DevOps",
    skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "Linux", "Nginx"],
    icon: "🛠️",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    title: "Design",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Blender"],
    icon: "🎭",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    title: "IoT",
    skills: ["Arduino", "ESP32", "Raspberry Pi", "MQTT", "WebSockets"],
    icon: "🔧",
    color: "from-indigo-500/20 to-purple-500/20"
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Technology Stack</h2>
            <div className="w-20 h-1 bg-primary rounded-full neon-border"></div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Tools and technologies I use to build amazing digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="p-6 space-y-4 bg-card border-primary/20 hover:border-primary/50 transition-all duration-300 card-3d group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/30 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
