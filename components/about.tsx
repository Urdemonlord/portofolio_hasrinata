"use client"

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">About</h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hasrinata Arya Afendi (Arya) adalah mahasiswa S1 Teknik Informatika di Universitas Muhammadiyah Semarang (UNIMUS, angkatan 2022) yang aktif sebagai founder MeowLabs, sebuah digital-tech agency & product studio yang mengembangkan layanan pembuatan website, aplikasi, AI tools, dan produk digital kreatif. Ia juga sedang membangun berbagai sub-brand seperti MeowLabs Store, MeowLabs Chat, MeowStack, dan MeowLabs AI dengan fokus pada identitas visual kuat (maskot kucing cyber, warna neon futuristik, dll).
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Arya banyak mengerjakan proyek software lintas bidang, mulai dari Roblox game ecosystem, e-commerce top-up (NajStore), SIMPUS (Sistem Informasi Puskesmas) terintegrasi BPJS & SATUSEHAT, IoT pest-detector SATRIA (audio + TinyML), KosAtlas (SaaS kos Semarang), hingga berbagai AI project seperti sentiment analysis IndoBERT, chatbot persona, dan dataset labeling pipeline. Ia menguasai stack modern seperti Next.js, Supabase, Vercel, Docker, Google Cloud, Python ML, IoT (ESP32, TinyML), dan React Native/Expo.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Selain teknis, ia juga punya minat bisnis dan strategi—sering menghitung pricing, membuat proposal ke klien, dan memikirkan model monetisasi SaaS di pasar Indonesia (UMKM, mahasiswa, lokal Semarang). Ia aktif membangun personal branding melalui GitHub, LinkedIn, domain pribadi, dan aset digital MeowLabs.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Arya bercita-cita menjadi AI Engineer & founder startup yang menggabungkan teknologi AI, produk digital, dan solusi berbasis kebutuhan lokal Indonesia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
