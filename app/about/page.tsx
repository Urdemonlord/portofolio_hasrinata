import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Laptop, User } from "lucide-react";

export const metadata = {
  title: "About | Hasrinata Arya Afendi",
  description: "Learn more about Hasrinata Arya Afendi, a Full-stack & AI Developer",
};

export default function AboutPage() {
  // Technical skills with proficiency levels
  const technicalSkills = [
    { name: "JavaScript/TypeScript", proficiency: 90 },
    { name: "React & Next.js", proficiency: 85 },
    { name: "Node.js", proficiency: 80 },
    { name: "Python", proficiency: 75 },
    { name: "TensorFlow/PyTorch", proficiency: 70 },
    { name: "AWS/GCP", proficiency: 65 },
    { name: "Flutter", proficiency: 60 },
  ];
  
  // Career timeline
  const careerTimeline = [
    {
      title: "Senior Full-stack Developer",
      company: "Tech Innovators Inc.",
      period: "2023 - Present",
      description: "Leading the development of enterprise web applications using Next.js, Node.js, and cloud technologies.",
    },
    {
      title: "AI Developer",
      company: "DataVision AI",
      period: "2021 - 2023",
      description: "Implemented machine learning models for computer vision and natural language processing applications.",
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions Co.",
      period: "2019 - 2021",
      description: "Developed responsive web applications using React and modern JavaScript.",
    },
  ];
  
  // Education background
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      year: "2019",
      description: "Specialized in Artificial Intelligence and Machine Learning.",
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "National Institute of Technology",
      year: "2017",
      description: "Graduated with honors, with a focus on software development.",
    },
  ];
  
  return (
    <div className="container py-10 md:py-16">
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
                I'm a passionate Full-stack & AI Developer with over 5 years of experience
                building web applications, mobile solutions, and machine learning systems.
                My expertise spans across the entire development lifecycle, from conceptualization
                to deployment and maintenance.
              </p>
              <p>
                I enjoy solving complex problems and continuously learning new technologies
                to stay at the forefront of the industry. My approach combines technical 
                excellence with a focus on creating intuitive user experiences.
              </p>
              <p>
                When I'm not coding, I contribute to open-source projects, write technical
                articles, and mentor aspiring developers. I believe in the power of technology
                to create positive change and am committed to ethical development practices.
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
                <Card key={index}>
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
                <Card key={index}>
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
            <div className="aspect-square bg-muted flex items-center justify-center">
              {/* Profile image would go here in a real implementation */}
              <User className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>Hasrinata Arya Afendi</CardTitle>
              <CardDescription>Full-stack & AI Developer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Location</span>
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Languages</span>
                <span>English (Fluent), Indonesian (Native)</span>
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
                  <Progress value={skill.proficiency} className="h-2" />
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