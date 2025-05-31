export interface Certificate {
  id: string;
  title: string;
  description: string;
  platform: string;
  category: string;
  date: string;
  issuedBy: string;
  credentialId: string;
  verificationUrl: string;
  skills: string[];
  pdfUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  stars: number;
  lastUpdated: string;
  featured: boolean;
  relatedCertificates?: string[];
}