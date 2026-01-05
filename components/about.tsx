"use client"

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tentang Saya</h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Saya mahasiswa Teknik Informatika di Universitas Muhammadiyah Semarang (angkatan 2022) yang berfokus pada pengembangan aplikasi web dan mobile. Saat ini mengelola MeowLabs sebagai digital agency yang mengerjakan berbagai project untuk klien lokal.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Pengalaman saya meliputi pengembangan sistem informasi kesehatan (SIMPUS) terintegrasi BPJS dan SATUSEHAT, platform e-commerce, aplikasi IoT untuk deteksi hama, serta berbagai project machine learning seperti sentiment analysis dan chatbot.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Saya bekerja dengan teknologi seperti Next.js, React, Python, TensorFlow, Supabase, dan IoT (ESP32). Selain coding, saya juga menangani aspek bisnis seperti pricing, proposal klien, dan strategi produk untuk pasar lokal Indonesia.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Target saya adalah membangun karir sebagai AI Engineer dan mengembangkan produk digital yang relevan dengan kebutuhan lokal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
