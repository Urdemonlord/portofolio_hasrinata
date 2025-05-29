import { Certificate } from "@/lib/types";

export const mockCertificates: Certificate[] = [
  {
    id: "cert-001",
    title: "Advanced React and Redux",
    description: "Comprehensive course covering advanced React patterns, Redux state management, middleware, and testing strategies for complex applications.",
    platform: "Udemy",
    category: "Web Development",
    date: "April 2023",
    issuedBy: "Udemy, Inc.",
    credentialId: "UC-REACT-123456",
    verificationUrl: "https://www.udemy.com/certificate/verify",
    skills: ["React", "Redux", "JavaScript", "Jest", "React Testing Library"]
  },
  {
    id: "cert-002",
    title: "TensorFlow Developer Certificate",
    description: "Professional certification validating skills in developing deep learning models with TensorFlow for computer vision, NLP, and time series analysis.",
    platform: "Google",
    category: "AI/ML",
    date: "January 2023",
    issuedBy: "Google",
    credentialId: "TF-DEV-789012",
    verificationUrl: "https://www.tensorflow.org/certificate",
    skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Computer Vision", "NLP"]
  },
  {
    id: "cert-003",
    title: "AWS Certified Developer - Associate",
    description: "Certification demonstrating expertise in developing, deploying, and debugging cloud-based applications using AWS services and best practices.",
    platform: "Amazon Web Services",
    category: "Cloud Computing",
    date: "November 2022",
    issuedBy: "Amazon Web Services",
    credentialId: "AWS-DEV-345678",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["AWS", "Lambda", "DynamoDB", "S3", "CloudFormation", "API Gateway"]
  },
  {
    id: "cert-004",
    title: "Full-Stack JavaScript Techdegree",
    description: "Comprehensive program covering front-end and back-end JavaScript development, including React, Node.js, Express, and MongoDB.",
    platform: "Treehouse",
    category: "Web Development",
    date: "August 2022",
    issuedBy: "Treehouse",
    credentialId: "TH-FSJS-901234",
    verificationUrl: "https://teamtreehouse.com/verify",
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    id: "cert-005",
    title: "Data Science Professional Certificate",
    description: "Professional program covering data analysis, visualization, machine learning, and data-driven decision making with Python and related tools.",
    platform: "Coursera",
    category: "Data Science",
    date: "May 2022",
    issuedBy: "IBM",
    credentialId: "IBM-DS-567890",
    verificationUrl: "https://www.coursera.org/verify",
    skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "Data Visualization", "Statistical Analysis"]
  },
  {
    id: "cert-006",
    title: "Flutter Development Bootcamp",
    description: "Intensive bootcamp covering Flutter framework for building natively compiled applications for mobile, web, and desktop from a single codebase.",
    platform: "Udemy",
    category: "Mobile Development",
    date: "March 2022",
    issuedBy: "Udemy, Inc.",
    credentialId: "UC-FLTR-234567",
    verificationUrl: "https://www.udemy.com/certificate/verify",
    skills: ["Flutter", "Dart", "Firebase", "State Management", "UI Design"]
  },
  {
    id: "cert-007",
    title: "DevOps with Docker Certification",
    description: "Certification course on containerization, orchestration, and DevOps practices using Docker, Docker Compose, and related technologies.",
    platform: "edX",
    category: "DevOps",
    date: "January 2022",
    issuedBy: "University of Helsinki",
    credentialId: "DWD-345678",
    verificationUrl: "https://courses.edx.org/verify",
    skills: ["Docker", "Containerization", "Docker Compose", "CI/CD", "DevOps"]
  },
  {
    id: "cert-008",
    title: "JavaScript Algorithms and Data Structures",
    description: "Certification covering JavaScript fundamentals, ES6, regular expressions, debugging, data structures, OOP, functional programming, and algorithms.",
    platform: "freeCodeCamp",
    category: "Web Development",
    date: "October 2021",
    issuedBy: "freeCodeCamp.org",
    credentialId: "FCC-JADS-456789",
    verificationUrl: "https://www.freecodecamp.org/certification/verify",
    skills: ["JavaScript", "ES6", "Algorithms", "Data Structures", "Debugging", "Functional Programming"]
  }
];