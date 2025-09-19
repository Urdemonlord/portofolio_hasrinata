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

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`
        ctx.fill()
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

  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl floating-animation"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/10 rotate-45 blur-2xl floating-animation"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-primary text-xl font-semibold tracking-wide">Hi, I'm</p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground text-balance leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Hasrinata
              </span>
              <br />
              <span className="text-primary">Arya Afendi</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-semibold">AI Engineer & Web Developer</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Mahasiswa Informatika yang passionate dalam crafting digital experiences dengan AI dan teknologi web
              modern. Saya fokus pada pengembangan solusi inovatif yang menggabungkan kecerdasan buatan dengan user
              experience yang optimal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Projects
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="glass-effect border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="glass-effect border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="glass-effect border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative w-96 h-96 mx-auto">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-full blur-xl animate-pulse"></div>

            {/* Main avatar container */}
            <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-card/50 to-primary/10 rounded-full flex items-center justify-center glass-effect border border-primary/20 floating-animation">
              <div className="w-80 h-80 bg-gradient-to-br from-card via-card/80 to-card/60 rounded-full flex items-center justify-center border-2 border-primary/30 shadow-2xl">
                <div className="text-8xl filter drop-shadow-lg">👨‍💻</div>
              </div>
            </div>

            {/* Floating tech icons */}
            <div
              className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center glass-effect floating-animation"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-2xl">🤖</span>
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center glass-effect floating-animation"
              style={{ animationDelay: "2s" }}
            >
              <span className="text-2xl">⚡</span>
            </div>
            <div
              className="absolute top-1/2 -left-8 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center glass-effect floating-animation"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="text-xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
