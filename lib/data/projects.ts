import { Project } from "@/lib/types";

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "AI Vision Assistant",
    description: "A computer vision application that helps visually impaired users navigate their environment using TensorFlow-powered object detection and audio feedback.",
    technologies: ["TensorFlow", "Python", "React Native", "Firebase"],
    githubUrl: "https://github.com/hasrinataarya/ai-vision-assistant",
    demoUrl: "https://ai-vision-assistant-demo.vercel.app",
    stars: 127,
    lastUpdated: "2 weeks ago",
    featured: true,
    relatedCertificates: ["cert-002"]
  },
  {
    id: "proj-002",
    name: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with product management, shopping cart, payment processing, and admin dashboard built with React and Node.js.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/hasrinataarya/ecommerce-platform",
    demoUrl: "https://ecommerce-platform-demo.vercel.app",
    stars: 89,
    lastUpdated: "1 month ago",
    featured: true,
    relatedCertificates: ["cert-001", "cert-004"]
  },
  {
    id: "proj-003",
    name: "Cloud Task Manager",
    description: "A serverless task management application built on AWS Lambda, DynamoDB, and API Gateway with a React frontend for creating, tracking, and completing tasks.",
    technologies: ["AWS Lambda", "DynamoDB", "API Gateway", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/hasrinataarya/cloud-task-manager",
    demoUrl: "https://cloud-task-manager-demo.vercel.app",
    stars: 72,
    lastUpdated: "3 months ago",
    featured: true,
    relatedCertificates: ["cert-003"]
  },
  {
    id: "proj-004",
    name: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets using D3.js and React, with data processing powered by Python and pandas.",
    technologies: ["React", "D3.js", "Python", "pandas", "Flask"],
    githubUrl: "https://github.com/hasrinataarya/data-viz-dashboard",
    demoUrl: "https://data-viz-dashboard-demo.vercel.app",
    stars: 64,
    lastUpdated: "2 months ago",
    featured: false,
    relatedCertificates: ["cert-005"]
  },
  {
    id: "proj-005",
    name: "Flutter Weather App",
    description: "A beautiful weather application built with Flutter that displays current conditions and forecasts for multiple locations with interactive animations.",
    technologies: ["Flutter", "Dart", "OpenWeather API", "Firebase"],
    githubUrl: "https://github.com/hasrinataarya/flutter-weather-app",
    demoUrl: "https://flutter-weather-app-demo.vercel.app",
    stars: 51,
    lastUpdated: "4 months ago",
    featured: false,
    relatedCertificates: ["cert-006"]
  },
  {
    id: "proj-006",
    name: "Docker Microservices Demo",
    description: "A demonstration of microservices architecture using Docker containers, Docker Compose, and a CI/CD pipeline for automated testing and deployment.",
    technologies: ["Docker", "Node.js", "Express", "GitHub Actions"],
    githubUrl: "https://github.com/hasrinataarya/docker-microservices",
    demoUrl: "https://docker-microservices-demo.vercel.app",
    stars: 45,
    lastUpdated: "5 months ago",
    featured: false,
    relatedCertificates: ["cert-007"]
  },
  {
    id: "proj-007",
    name: "Algorithm Visualizer",
    description: "An educational tool for visualizing various algorithms and data structures, helping users understand complex computer science concepts interactively.",
    technologies: ["JavaScript", "HTML Canvas", "CSS"],
    githubUrl: "https://github.com/hasrinataarya/algorithm-visualizer",
    demoUrl: "https://algorithm-visualizer-demo.vercel.app",
    stars: 38,
    lastUpdated: "6 months ago",
    featured: false,
    relatedCertificates: ["cert-008"]
  }
];