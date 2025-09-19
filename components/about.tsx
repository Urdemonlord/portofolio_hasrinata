export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Saya adalah mahasiswa Informatika yang memiliki passion mendalam dalam bidang Artificial Intelligence
                dan Web Development. Dengan latar belakang yang kuat dalam pemrograman dan desain, saya selalu berusaha
                menciptakan solusi teknologi yang tidak hanya fungsional, tetapi juga memberikan pengalaman pengguna
                yang luar biasa.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Filosofi kerja saya adalah "attention to detail" - saya percaya bahwa kualitas terletak pada
                detail-detail kecil yang sering terlewatkan. Setiap proyek yang saya kerjakan selalu didekati dengan
                mindset untuk terus belajar dan berkembang, mengikuti perkembangan teknologi terkini.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Di luar dunia coding, saya menikmati eksplorasi teknologi IoT dan hardware development. Saya juga aktif
                dalam komunitas developer lokal dan senang berbagi pengetahuan melalui workshop dan mentoring.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Quick Facts</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>🎓 Mahasiswa Informatika</li>
                  <li>🤖 AI & Machine Learning Enthusiast</li>
                  <li>🌐 Full-Stack Web Developer</li>
                  <li>⚡ IoT Hardware Developer</li>
                  <li>📚 Continuous Learner</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
