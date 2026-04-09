"use client"

import { useEffect, useRef } from "react"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }> = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(145, 94, 255, ${p.opacity})`
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(145, 94, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Background Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full floating-animation"
          style={{
            background: "radial-gradient(circle, rgba(145, 94, 255, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full floating-animation"
          style={{
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(145, 94, 255, 0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-medium tracking-widest uppercase text-[#915EFF]">
              <span className="w-2 h-2 rounded-full bg-[#915EFF] animate-pulse" />
              Available for New Projects
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <p className="text-[#ccc3d7] text-base tracking-wider uppercase">
                Hasrinata Arya Afendi
              </p>
              <h1
                className="text-5xl md:text-7xl font-bold text-[#dfe1f6] leading-tight"
                style={{ letterSpacing: "-0.04em" }}
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text-purple">Hasrinata</span>
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-[#dfe1f6]" style={{ letterSpacing: "-0.02em" }}>
                AI Engineer &amp; Full-Stack Developer
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-[#ccc3d7] leading-relaxed max-w-xl">
              Mahasiswa Informatika yang membangun aplikasi web, mobile, dan solusi AI. Founder MeowLabs — digital agency untuk kebutuhan lokal Indonesia.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 rounded-xl gradient-purple text-white font-semibold text-sm tracking-wide hover:opacity-90 transition-all duration-300 hover:scale-105"
                style={{ boxShadow: "0 8px 30px rgba(145, 94, 255, 0.3)" }}
              >
                View My Work
              </button>
              <a
                href="mailto:hasrinata@gmail.com"
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-[#dfe1f6] border border-[#4a4455] hover:border-[#915EFF]/50 hover:bg-[#915EFF]/5 transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Github, href: "https://github.com/Urdemonlord", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/hasrinata", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hasrinata@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-[#ccc3d7] hover:text-[#915EFF] hover:border-[#915EFF]/30 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Code Card */}
          <div
            className="hidden lg:block animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              {/* Main Terminal Card */}
              <div className="glass-card rounded-2xl p-6 glow-purple">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-[#ccc3d7] font-mono">hasrinata.config.ts</span>
                </div>

                {/* Code Content */}
                <div className="font-mono text-sm space-y-1 text-[#ccc3d7]">
                  <p><span className="text-[#4F46E5]">const</span> <span className="text-[#dfe1f6]">dev</span> = {"{"}</p>
                  <p className="pl-4"><span className="text-[#915EFF]">name</span>: <span className="text-green-400">&quot;Hasrinata Arya Afendi&quot;</span>,</p>
                  <p className="pl-4"><span className="text-[#915EFF]">role</span>: <span className="text-green-400">&quot;AI Engineer &amp; Full-Stack Dev&quot;</span>,</p>
                  <p className="pl-4"><span className="text-[#915EFF]">stack</span>: [</p>
                  <p className="pl-8"><span className="text-green-400">&quot;Next.js&quot;</span>, <span className="text-green-400">&quot;Python&quot;</span>, <span className="text-green-400">&quot;TensorFlow&quot;</span>,</p>
                  <p className="pl-8"><span className="text-green-400">&quot;Supabase&quot;</span>, <span className="text-green-400">&quot;ESP32&quot;</span></p>
                  <p className="pl-4">],</p>
                  <p className="pl-4"><span className="text-[#915EFF]">company</span>: <span className="text-green-400">&quot;MeowLabs&quot;</span>,</p>
                  <p className="pl-4"><span className="text-[#915EFF]">location</span>: <span className="text-green-400">&quot;Semarang, Indonesia&quot;</span>,</p>
                  <p className="pl-4"><span className="text-[#915EFF]">available</span>: <span className="text-[#4F46E5]">true</span>,</p>
                  <p>{"}"}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-[#915EFF]">$</span>
                    <span className="text-[#dfe1f6]"> npm run build-something-awesome</span>
                    <span className="w-0.5 h-4 bg-[#915EFF] animate-pulse ml-1" />
                  </div>
                </div>
              </div>

              {/* Floating badge - status */}
              <div
                className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 floating-animation"
                style={{ animationDelay: "1s" }}
              >
                <p className="text-xs text-[#ccc3d7] uppercase tracking-wider">Experience</p>
                <p className="text-2xl font-bold gradient-text-purple">3+</p>
                <p className="text-xs text-[#ccc3d7]">Years</p>
              </div>

              {/* Floating badge - projects */}
              <div
                className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-3 floating-animation"
                style={{ animationDelay: "2s" }}
              >
                <p className="text-xs text-[#ccc3d7] uppercase tracking-wider">Projects</p>
                <p className="text-2xl font-bold gradient-text-purple">20+</p>
                <p className="text-xs text-[#ccc3d7]">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center mt-20 pb-8">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-[#ccc3d7] hover:text-[#915EFF] transition-colors duration-300 group"
          >
            <span className="text-xs uppercase tracking-widest">Scroll Down</span>
            <ChevronDown
              className="h-5 w-5"
              style={{ animation: "scrollBounce 1.5s ease-in-out infinite" }}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
