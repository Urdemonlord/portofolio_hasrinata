"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    period: "2023 — Present",
    title: "Founder & CEO",
    company: "MeowLabs",
    description:
      "Memimpin MeowLabs sebagai digital-tech agency & product studio yang mengembangkan website, aplikasi, AI tools, dan produk digital kreatif. Mengelola sub-brand termasuk MeowLabs Store, MeowLabs Chat, MeowStack, dan MeowLabs AI dengan fokus pada identitas visual futuristik.",
    technologies: ["Next.js", "Supabase", "Docker", "Google Cloud", "Product Management", "Business Strategy"],
    icon: "�",
  },
  {
    period: "2023 — Present",
    title: "Full-Stack Developer & ML Engineer",
    company: "Various Projects",
    description:
      "Mengembangkan SIMPUS (Sistem Informasi Puskesmas) terintegrasi BPJS & SATUSEHAT, e-commerce NajStore, dan IoT pest-detector SATRIA. Menangani sentiment analysis IndoBERT, chatbot persona, dan dataset labeling pipeline dengan fokus solusi lokal Indonesia.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "ESP32", "TinyML"],
    icon: "🤖",
  },
  {
    period: "2024 — Present",
    title: "SaaS Product Developer",
    company: "KosAtlas & MeowStack",
    description:
      "Mengembangkan KosAtlas sebagai SaaS untuk manajemen kos di Semarang dan MeowStack sebagai platform pembantu developer. Menangani pricing strategy, proposal klien, dan model monetisasi untuk pasar Indonesia.",
    technologies: ["Next.js", "Supabase", "Vercel", "React", "PostgreSQL"],
    icon: "🏢",
  },
  {
    period: "2022 — Present",
    title: "Game & Web Ecosystem Developer",
    company: "Roblox & Web Ecosystem",
    description:
      "Mengembangkan berbagai proyek di Roblox game ecosystem dan web infrastructure. Berpengalaman dengan React Native/Expo untuk mobile development dan integrasi dengan berbagai platform digital.",
    technologies: ["Roblox", "React Native", "Expo", "JavaScript", "Web APIs"],
    icon: "�",
  },
  {
    period: "2022 — Present",
    title: "Student & Researcher",
    company: "Universitas Muhammadiyah Semarang (UNIMUS)",
    description:
      "Mahasiswa S1 Teknik Informatika (angkatan 2022) dengan fokus pada AI, IoT, dan pengembangan produk digital. Aktif meneliti dan mengimplementasikan solusi teknologi yang relevan dengan kebutuhan lokal.",
    technologies: ["Python", "Machine Learning", "IoT", "Docker", "Google Cloud"],
    icon: "�",
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in-up">Experience</h2>
            <p className="text-xl text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              My journey through various roles and projects
            </p>
            <div
              className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 timeline-line"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } animate-slide-in-left`}
                  style={{ animationDelay: `${0.6 + index * 0.2}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                      index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <Card className="glass-effect border-primary/20 card-3d group hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          {/* Period and icon */}
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                              {exp.period}
                            </Badge>
                            <div className="text-2xl">{exp.icon}</div>
                          </div>

                          {/* Title and company */}
                          <div>
                            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {exp.title}
                            </h3>
                            <p className="text-primary font-semibold text-lg">{exp.company}</p>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed text-base">{exp.description}</p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
