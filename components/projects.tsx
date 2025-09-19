import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "AI-Powered Learning Assistant",
    description:
      "Sistem pembelajaran adaptif menggunakan machine learning untuk memberikan rekomendasi materi yang dipersonalisasi berdasarkan gaya belajar siswa.",
    image: "/placeholder-tgej3.png",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
    category: "AI/ML",
    github: "#",
    demo: "#",
  },
  {
    title: "Smart Campus IoT System",
    description:
      "Sistem monitoring kampus pintar dengan sensor IoT untuk mengukur kualitas udara, suhu, dan occupancy ruangan. Dashboard real-time untuk admin kampus.",
    image: "/placeholder-425f1.png",
    technologies: ["ESP32", "React", "Node.js", "MQTT", "InfluxDB"],
    category: "IoT",
    github: "#",
    demo: "#",
  },
  {
    title: "E-Commerce Platform",
    description:
      "Platform e-commerce full-stack dengan fitur payment gateway, inventory management, dan analytics dashboard. Dioptimalkan untuk performa tinggi.",
    image: "/modern-ecommerce-interface.png",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe", "Vercel"],
    category: "Web",
    github: "#",
    demo: "#",
  },
  {
    title: "Computer Vision Object Detection",
    description:
      "Aplikasi deteksi objek real-time menggunakan YOLO dan OpenCV. Dapat mendeteksi dan mengklasifikasi berbagai objek dengan akurasi tinggi.",
    image: "/placeholder-8qxob.png",
    technologies: ["Python", "OpenCV", "YOLO", "PyTorch", "Streamlit"],
    category: "AI/ML",
    github: "#",
    demo: "#",
  },
  {
    title: "Task Management App",
    description:
      "Aplikasi manajemen tugas dengan fitur kolaborasi tim, real-time updates, dan integrasi kalender. UI/UX yang intuitif dan responsive.",
    image: "/task-management-app.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind"],
    category: "Web",
    github: "#",
    demo: "#",
  },
  {
    title: "Weather Monitoring Station",
    description:
      "Stasiun cuaca otomatis dengan sensor multiple dan transmisi data wireless. Data tersimpan di cloud dengan visualisasi grafik historis.",
    image: "/placeholder-a417o.png",
    technologies: ["Arduino", "ESP8266", "Firebase", "React", "Chart.js"],
    category: "IoT",
    github: "#",
    demo: "#",
  },
]

const categories = ["All", "AI/ML", "Web", "IoT"]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my best work across AI, web development, and IoT
            </p>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="border-border bg-card hover:bg-card/80 transition-all duration-300 group overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {project.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs border-border text-muted-foreground">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
