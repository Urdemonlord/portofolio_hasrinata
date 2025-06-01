import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Github, Laptop } from "lucide-react";
import RecentCertificates from "@/components/home/recent-certificates";
import FeaturedProjects from "@/components/home/featured-projects";
import YouTubeSection from "@/components/home/youtube-section";
import { getGithubProjects } from "@/lib/github";
import { Project } from "@/lib/types";

export default async function Home() {
  let featuredProjects: Project[] = [];
  try {
    const allProjects = await getGithubProjects();
    featuredProjects = allProjects.filter(project => project.featured);
  } catch (error) {
    console.error("Error fetching featured GitHub projects:", error);
  }

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,var(--tw-gradient-stops))] from-primary/20 to-transparent dark:from-primary/10 blur-2xl"></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center animate-fade-in-scale">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-slide-in-up">
              Hasrinata Arya Afendi
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              Ngoding Bukan Sekadar Kode, Tapi Cara Bicara ke Dunia
            </p>
            <p className="mx-auto max-w-[700px] text-muted-foreground animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              Portofolio Sertifikasi dan Proyek Full-stack & AI Developer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
              <Button asChild size="lg" className="btn-dynamic hover-scale">
                <Link href="/certificates">
                  View Certificates <Award className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-dynamic hover-scale">
                <Link href="/projects">
                  Explore GitHub Projects <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 mb-10 animate-slide-in-up">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Recent Certificates
            </h2>
            <p className="text-muted-foreground">
              A selection of my latest achievements in professional development
            </p>
          </div>
          <RecentCertificates />
          <div className="mt-8 flex justify-center animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="outline">
              <Link href="/certificates">
                View All Certificates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 mb-10 animate-slide-in-up">
            <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
              Featured Projects
            </h2>
            <p className="text-muted-foreground">
              Explore my latest GitHub projects and contributions
            </p>
          </div>
          <FeaturedProjects projects={featuredProjects} />
          <div className="mt-8 flex justify-center animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="outline">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* YouTube Section */}
      <YouTubeSection />
      
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6 animate-slide-in-left">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
                About Me
              </h2>
              <p className="text-muted-foreground">
                I&apos;m a passionate Full-stack & AI Developer with a focus on creating
                elegant solutions to complex problems. My journey in tech is
                driven by continuous learning and growth.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    Contact Me
                  </Link>
                </Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-muted relative hover-lift animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
              <Image
                src="/img/ngoding.png"
                alt="Hasrinata coding workspace"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}