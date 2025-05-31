import { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Hasrinata Arya Afendi",
  description: "Get in touch with Hasrinata Arya Afendi for collaboration or inquiries",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "hasrinata.arya@example.com",
      href: "mailto:hasrinata.arya@example.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+62 123 456 7890",
      href: "tel:+621234567890",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: null,
    },
  ];
  
  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com/Urdemonlord",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/hasrinata",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      label: "Twitter",
      href: "https://twitter.com/hasrinataarya",
    },
  ];
  
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Contact Me</h1>
        <p className="text-muted-foreground mt-1">
          Get in touch for collaboration, opportunities, or just to say hello
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Reach out directly through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <Link 
                          href={item.href}
                          className="font-medium hover:underline"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-3">Social Profiles</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                I'm currently available for freelance projects, consulting work, and
                full-time opportunities. My typical response time is within 24-48 hours.
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium">Preferred Project Types:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Full-stack web applications</li>
                  <li>• AI/ML integration projects</li>
                  <li>• Frontend development with React/Next.js</li>
                  <li>• Mobile app development</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}