"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef } from "react"

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
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Rainbow colors for particles
    const colors = [
      { r: 236, g: 72, b: 153 },   // Pink
      { r: 139, g: 92, b: 246 },   // Purple
      { r: 59, g: 130, b: 246 },   // Blue
      { r: 16, g: 185, b: 129 },   // Green
      { r: 245, g: 158, b: 11 },   // Orange
    ]

    // Create particles
    for (let i = 0; i < 80; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color
      } as any)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle: any) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        // Colorful particles
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1: any, i) => {
        particles.slice(i + 1).forEach((p2: any) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            // Mix colors for connections
            const avgR = (p1.color.r + p2.color.r) / 2
            const avgG = (p1.color.g + p2.color.g) / 2
            const avgB = (p1.color.b + p2.color.b) / 2
            ctx.strokeStyle = `rgba(${avgR}, ${avgG}, ${avgB}, ${0.15 * (1 - distance / 150)})`
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl floating-animation"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg uppercase tracking-wider">Hi, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight relative">
                <span className="relative inline-block">
                  Hasrinata
                  <div className="absolute -inset-1 bg-primary/20 blur-xl rounded-lg -z-10"></div>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                I build{" "}
                <span className="text-primary font-semibold">seamless digital experiences</span>{" "}
                across mobile and web
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 pt-4">
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-medium neon-border group"
              >
                View My Work
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
                  onClick={() => window.open('https://github.com/Urdemonlord', '_blank')}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
                  onClick={() => window.open('https://linkedin.com/in/hasrinata', '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
                  onClick={() => window.location.href = 'mailto:hasrinata@gmail.com'}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* 3D Visual Element */}
          <div className="relative animate-fade-in-up hidden lg:block" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full h-96">
              {/* Main 3D Card */}
              <div className="absolute inset-0 card-3d group">
                <div className="w-full h-full bg-gradient-to-br from-card via-card/50 to-background rounded-2xl border-2 border-primary/30 neon-border flex items-center justify-center overflow-hidden">
                  {/* Code Animation Background */}
                  <div className="absolute inset-0 opacity-10 text-xs text-primary font-mono overflow-hidden">
                    <div className="animate-slide-in-left">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="whitespace-nowrap">
                          {`const dev = { name: "Hasrinata", skills: ["React", "Node", "AI"] }; `}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10">
                    <div className="text-9xl filter drop-shadow-2xl floating-animation">💻</div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div
                className="absolute -top-8 -right-8 w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center glass-effect floating-animation neon-border rotate-12"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-3xl">⚛️</span>
              </div>
              <div
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent/20 rounded-2xl flex items-center justify-center glass-effect floating-animation neon-border -rotate-12"
                style={{ animationDelay: "2s" }}
              >
                <span className="text-3xl">🤖</span>
              </div>
              <div
                className="absolute top-1/2 -left-12 w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center glass-effect floating-animation neon-border rotate-45"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-2xl">⚡</span>
              </div>
              <div
                className="absolute top-1/4 -right-12 w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center glass-effect floating-animation neon-border -rotate-45"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
