"use client"

import { Globe, Smartphone, Server } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Developer",
    description: "Membangun aplikasi web modern dengan Next.js, React, dan Supabase. Fokus pada performa, UX, dan skalabilitas.",
  },
  {
    icon: Smartphone,
    title: "Mobile Developer",
    description: "Mengembangkan aplikasi mobile cross-platform dengan React Native dan Expo untuk Android & iOS.",
  },
  {
    icon: Server,
    title: "AI Engineer",
    description: "Membangun solusi AI — dari NLP (IndoBERT, chatbot) hingga Computer Vision (YOLO, TinyML) dan IoT.",
  },
]

export function About() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(145, 94, 255, 0.04) 0%, transparent 60%)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-20 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-[#915EFF] font-medium">Introduction</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#dfe1f6]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Overview.
          </h2>
          <div className="w-16 h-0.5 gradient-purple rounded-full" />
        </div>

        {/* Bio */}
        <div
          className="max-w-3xl mb-20 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <p className="text-lg text-[#ccc3d7] leading-relaxed">
            Saya mahasiswa Teknik Informatika di Universitas Muhammadiyah Semarang (angkatan 2022) yang berfokus pada AI, IoT, dan pengembangan produk digital.
            Saat ini mengelola <span className="text-[#915EFF] font-semibold">MeowLabs</span> sebagai digital agency — mengerjakan berbagai project mulai dari SIMPUS terintegrasi BPJS, platform e-commerce, hingga IoT pest-detector dengan TinyML.
          </p>
          <p className="text-lg text-[#ccc3d7] leading-relaxed mt-4">
            Target saya: membangun karir sebagai AI Engineer dan menciptakan produk digital yang relevan dengan kebutuhan lokal Indonesia. <span className="text-[#915EFF]">Selalu belajar, selalu membangun. 🚀</span>
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-8 card-3d glow-purple-hover group cursor-default"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#dfe1f6] mb-3 group-hover:text-[#915EFF] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#ccc3d7] leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
