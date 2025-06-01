import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProgressClient from "@/components/ProgressClient";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, GraduationCap, Laptop, User } from "lucide-react";

export const metadata = {
  title: "About | Hasrinata Arya Afendi",
  description: "Learn more about Hasrinata Arya Afendi, a Full-stack & AI Developer",
};

export default function AboutPage() {
  // Technical skills with proficiency levels
  const technicalSkills = [
    { name: "JavaScript/TypeScript", proficiency: 85 },
    { name: "React & Next.js", proficiency: 80 },
    { name: "Python", proficiency: 90 },
    { name: "Machine Learning (scikit-learn, XGBoost)", proficiency: 80 },
    { name: "NLP (IndoBERT, Transformers)", proficiency: 75 },
    { name: "SQL & Data Visualization", proficiency: 70 },
    { name: "AWS / Google Cloud", proficiency: 65 },
  ];

  // Career timeline
  const careerTimeline = [
    {
      title: "Data Scientist & Full-stack Developer (Freelance)",
      company: "Self-employed / Codex",
      period: "2023 - Present",
      description:
        "Built multiple data-driven apps and web platforms using Next.js, Flask, and cloud tools. Focus on prompt engineering, AI integration, and open-source contributions.",
    },
    {
      title: "Student Developer & Robotics Enthusiast",
      company: "Universitas Muhammadiyah Semarang",
      period: "2022 - Present",
      description:
        "Involved in software development, machine learning projects (toxic comment detection, OCR hybrid models), and robotics (Soccerbot control system using Kotlin & Arduino).",
    },
  ];

  // Education background
  const education = [
    {
      degree: "Bachelor of Informatics Engineering",
      institution: "Universitas Muhammadiyah Semarang",
      year: "Expected 2026",
      description:
        "Focus on Data Science, Artificial Intelligence, Web Development, and Cloud Computing.",
    },
    {
      degree: "Certified Programs & Bootcamps",
      institution: "Dicoding, Bangkit Academy, Google Cloud, AWS",
      year: "2023 - 2025",
      description:
        "Completed certifications in cloud, AI, machine learning, backend development, and DevOps. Projects include NLP, visual novel games, and decision support systems.",
    },
  ];

  return (
    <div className="container py-10 md:py-16 page-transition">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">About Me</h1>
        <p className="text-muted-foreground mt-1">
          Learn more about my background, skills, and experience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Professional Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                I&apos;m Hasrinata Arya Afendi — a Full-stack & AI Developer with
                strong interest in web engineering, machine learning, and cloud
                computing. I build things that solve real problems, with a data-driven
                and ethical approach.
              </p>
              <p>
                I&apos;ve worked on projects like toxic comment detection using
                IndoBERT and Explainable AI, hybrid OCR systems, decision support
                systems, and social media apps for campus environments.
              </p>
              <p>
                Outside of coding, I write articles, learn about startup models,
                and explore robotics. Im focused on building impactful solutions,
                learning fast, and delivering clean code.
              </p>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Experience
            </h2>
            <div className="space-y-6">
              {careerTimeline.map((job, index) => (
                <Card 
                  key={index}
                  className="card-hover hover-lift animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </div>
                      <Badge variant="outline">{job.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card 
                  key={index}
                  className="card-hover hover-lift animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{edu.degree}</CardTitle>
                        <CardDescription>{edu.institution}</CardDescription>
                      </div>
                      <Badge variant="outline">{edu.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
              <Image
                src="/img/orang-ganteng.png"
                alt="Hasrinata Arya Afendi"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Hasrinata Arya Afendi</CardTitle>
              <CardDescription>Full-stack & AI Developer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Location</span>
                <span>Semarang, Indonesia</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Languages</span>
                <span>English (B2), Indonesian (Native)</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Laptop className="h-5 w-5" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {technicalSkills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <ProgressClient value={skill.proficiency} max={100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/contact">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}