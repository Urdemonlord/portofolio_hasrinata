"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      const currentScrollPosition = scrollPosition + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (currentScrollPosition >= offsetTop && currentScrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-nav shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="text-lg md:text-xl font-bold text-[#dfe1f6] hover:scale-105 transition-transform duration-300 tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Hasrinata
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-[#915EFF] bg-[#915EFF]/10"
                      : "text-[#ccc3d7] hover:text-[#dfe1f6] hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <a
                href="mailto:hasrinata@gmail.com"
                className="ml-3 px-5 py-2 text-sm font-medium rounded-lg gradient-purple text-white hover:opacity-90 transition-opacity duration-300"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden glass-effect p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-[#dfe1f6]" />
              ) : (
                <Menu className="h-5 w-5 text-[#dfe1f6]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-[#0f1321]/80 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-20 right-4 left-4 glass-card rounded-2xl p-6 shadow-2xl animate-fade-in-up">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-[#915EFF] bg-[#915EFF]/10"
                      : "text-[#ccc3d7] hover:text-[#dfe1f6] hover:bg-white/5"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.name}
                </button>
              ))}
              <a
                href="mailto:hasrinata@gmail.com"
                className="block text-center px-4 py-3 mt-4 text-sm font-medium rounded-xl gradient-purple text-white"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
