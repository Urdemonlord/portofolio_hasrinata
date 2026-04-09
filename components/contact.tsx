"use client"

import { useState } from "react"
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSent(false), 5000)
  }

  const contactDetails = [
    {
      icon: Mail,
      label: "Email",
      value: "hasrinata@gmail.com",
      href: "mailto:hasrinata@gmail.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+62 857-2545-9881",
      href: "https://wa.me/6285725459881",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Semarang, Indonesia",
      href: null,
    },
  ]

  const socials = [
    { icon: Github, href: "https://github.com/Urdemonlord", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/hasrinata", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hasrinata@gmail.com", label: "Email" },
  ]

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(145, 94, 255, 0.06) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="space-y-4 mb-20 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.2em] text-[#915EFF] font-medium">Let&apos;s Talk</p>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#dfe1f6]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Get in Touch.
          </h2>
          <div className="w-16 h-0.5 gradient-purple rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="space-y-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-lg text-[#ccc3d7] leading-relaxed">
              Sedang mencari peluang baru. Apakah kamu punya pertanyaan, project yang menarik, atau hanya ingin say hi — saya akan berusaha membalas secepatnya!
            </p>

            {/* Contact Details */}
            <div className="space-y-5">
              {contactDetails.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl gradient-purple flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-[#ccc3d7] uppercase tracking-widest mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-[#dfe1f6] font-medium hover:text-[#915EFF] transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#dfe1f6] font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs text-[#ccc3d7] uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-[#ccc3d7] hover:text-[#915EFF] hover:border-[#915EFF]/30 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#ccc3d7]">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full bg-[#0a0d1c] text-[#dfe1f6] placeholder-[#4a4455] px-4 py-3 rounded-xl border border-[#4a4455]/30 focus:border-[#915EFF] focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#ccc3d7]">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-[#0a0d1c] text-[#dfe1f6] placeholder-[#4a4455] px-4 py-3 rounded-xl border border-[#4a4455]/30 focus:border-[#915EFF] focus:outline-none transition-colors duration-300 text-sm"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[#ccc3d7]">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can I help you?"
                    required
                    rows={5}
                    className="w-full bg-[#0a0d1c] text-[#dfe1f6] placeholder-[#4a4455] px-4 py-3 rounded-xl border border-[#4a4455]/30 focus:border-[#915EFF] focus:outline-none transition-colors duration-300 text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={sending || sent}
                  className="w-full py-4 rounded-xl gradient-purple text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-60"
                  style={{ boxShadow: "0 8px 30px rgba(145, 94, 255, 0.3)" }}
                >
                  {sent ? (
                    "✓ Message Sent!"
                  ) : sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-10 relative z-10">
        <div
          className="max-w-5xl mx-auto border-t"
          style={{ borderColor: "rgba(74, 68, 85, 0.3)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-sm text-[#ccc3d7]">
              © 2025 <span className="text-[#dfe1f6] font-medium">Hasrinata Arya Afendi</span>. All rights reserved.
            </p>
            <p className="text-xs text-[#4a4455]">
              Built with Next.js + Midnight Protocol Design System
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
