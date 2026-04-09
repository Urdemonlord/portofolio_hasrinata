"use client"

const experiences = [
  {
    period: "2023 — Sekarang",
    title: "Founder & Lead Developer",
    company: "MeowLabs",
    companyUrl: "https://github.com/Urdemonlord",
    description:
      "Membangun MeowLabs sebagai digital agency — mengembangkan website, aplikasi mobile, dan produk digital. Mengelola sub-brand: MeowLabs Store, MeowLabs Chat, dan MeowStack.",
    technologies: ["Next.js", "Supabase", "Docker", "Google Cloud", "Product Management"],
  },
  {
    period: "2024 — Sekarang",
    title: "Product Developer",
    company: "KosAtlas & MeowStack",
    companyUrl: null,
    description:
      "Mengembangkan KosAtlas (platform manajemen kos di Semarang) dan MeowStack (developer tools). Menangani pricing, proposal klien, dan strategi monetisasi.",
    technologies: ["Next.js", "Supabase", "Vercel", "React", "PostgreSQL"],
  },
  {
    period: "2023 — Sekarang",
    title: "Full-Stack Developer",
    company: "Freelance & Project-Based",
    companyUrl: null,
    description:
      "Mengembangkan SIMPUS terintegrasi BPJS & SATUSEHAT, platform e-commerce NajStore, dan IoT pest-detector SATRIA. Sentiment analysis dengan IndoBERT dan chatbot.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "ESP32", "TinyML"],
  },
  {
    period: "2022 — Sekarang",
    title: "Mahasiswa Teknik Informatika",
    company: "Universitas Muhammadiyah Semarang",
    companyUrl: null,
    description:
      "Angkatan 2022 dengan fokus pada AI, IoT, dan pengembangan produk digital. Mengerjakan berbagai project termasuk Roblox game ecosystem dan aplikasi mobile.",
    technologies: ["Python", "Machine Learning", "IoT", "React Native", "Expo"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(27, 31, 46, 0.3), transparent)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-20 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-[#915EFF] font-medium">Career</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#dfe1f6]"
            style={{ letterSpacing: "-0.03em" }}
          >
            What I have done so far.
          </h2>
          <div className="w-16 h-0.5 gradient-purple rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 md:gap-0 animate-fade-in-up ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${0.1 + index * 0.15}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 mt-6">
                  <div
                    className="w-4 h-4 rounded-full gradient-purple"
                    style={{ boxShadow: "0 0 12px rgba(145, 94, 255, 0.5)" }}
                  >
                    <div className="w-full h-full rounded-full bg-[#915EFF] animate-pulse" />
                  </div>
                </div>

                {/* Spacer for center column (desktop) */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                }`}>
                  <div className="glass-card rounded-2xl p-7 card-3d glow-purple-hover group">
                    {/* Period Badge */}
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-[#915EFF] border border-[#915EFF]/30 bg-[#915EFF]/5 mb-4 uppercase tracking-wider">
                      {exp.period}
                    </span>

                    {/* Title & Company */}
                    <h3 className="text-xl font-bold text-[#dfe1f6] mb-1 group-hover:text-[#915EFF] transition-colors duration-300">
                      {exp.title}
                    </h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#915EFF] font-semibold text-sm hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <p className="text-[#915EFF] font-semibold text-sm">{exp.company}</p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-[#ccc3d7] leading-relaxed mt-3 mb-4">
                      {exp.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="tech-chip">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
