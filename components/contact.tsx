"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Kontak</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Untuk diskusi project, kolaborasi, atau pertanyaan lainnya, silakan hubungi saya melalui kontak di bawah ini.
            </p>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">Hubungi Saya</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Saya terbuka untuk diskusi mengenai project baru, kolaborasi, atau konsultasi terkait pengembangan aplikasi web dan mobile.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:hasrinata@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">hasrinata@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+6285725459881" className="text-muted-foreground hover:text-primary transition-colors">+62 857-2545-9881</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Lokasi</p>
                    <p className="text-muted-foreground">Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Media Sosial</h4>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 hover:border-primary bg-transparent"
                    onClick={() => window.open('https://github.com/Urdemonlord', '_blank')}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 hover:border-primary bg-transparent"
                    onClick={() => window.open('https://linkedin.com/in/hasrinata', '_blank')}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary/10 hover:border-primary bg-transparent"
                    onClick={() => window.location.href = 'mailto:hasrinata@gmail.com'}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <Input placeholder="Your name" className="bg-background border-border focus:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Subjek</label>
                    <Input
                      placeholder="Subjek pesan"
                      className="bg-background border-border focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Pesan</label>
                    <Textarea
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      className="bg-background border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Kirim Pesan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-border">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">2024 Hasrinata Arya Afendi</p>
          <p className="text-sm text-muted-foreground">Dibangun dengan Next.js dan Tailwind CSS</p>
        </div>
      </footer>
    </section>
  )
}
