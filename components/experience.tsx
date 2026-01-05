"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    period: "2023 — Sekarang",
    title: "Founder",
    company: "MeowLabs",
    description:
      "Membangun MeowLabs sebagai digital agency yang mengembangkan website, aplikasi mobile, dan produk digital. Mengelola sub-brand seperti MeowLabs Store, MeowLabs Chat, dan MeowStack.",
    technologies: ["Next.js", "Supabase", "Docker", "Google Cloud", "Product Management"],
  },
  {
    period: "2023 — Sekarang",
    title: "Full-Stack Developer",
    company: "Freelance & Project-Based",
    description:
      "Mengembangkan SIMPUS (Sistem Informasi Puskesmas) terintegrasi BPJS dan SATUSEHAT, platform e-commerce NajStore, serta IoT pest-detector SATRIA. Mengerjakan sentiment analysis dengan IndoBERT dan chatbot untuk berbagai klien.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "ESP32", "TinyML"],
  },
  {
    period: "2024 — Sekarang",
    title: "Product Developer",
    company: "KosAtlas & MeowStack",
    description:
      "Mengembangkan KosAtlas sebagai platform manajemen kos di Semarang dan MeowStack sebagai tools untuk developer. Menangani pricing, proposal klien, dan strategi monetisasi.",
    technologies: ["Next.js", "Supabase", "Vercel", "React", "PostgreSQL"],
  },
  {
    period: "2022 — Sekarang",
    title: "Mahasiswa Teknik Informatika",
    company: "Universitas Muhammadiyah Semarang",
    description:
      "Angkatan 2022 dengan fokus pada AI, IoT, dan pengembangan produk digital. Mengerjakan berbagai project termasuk Roblox game ecosystem dan aplikasi mobile dengan React Native.",
    technologies: ["Python", "Machine Learning", "IoT", "React Native", "Expo"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/30 to-background"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground animate-fade-in-up">Pengalaman</h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
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
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                              {exp.period}
                            </Badge>
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
