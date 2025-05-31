import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileDown } from "lucide-react";
import { mockCertificates } from "@/lib/data/certificates";
import { mockProjects } from "@/lib/data/projects";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedProjects from "@/components/certificates/related-projects";

// Fungsi ini diperlukan untuk static export
export async function generateStaticParams() {
  return mockCertificates.map((certificate) => ({
    id: certificate.id,
  }));
}

export const generateMetadata = ({ params }: { params: { id: string } }) => {
  const certificate = mockCertificates.find((cert) => cert.id === params.id);
  
  if (!certificate) {
    return {
      title: "Certificate Not Found",
    };
  }
  
  return {
    title: `${certificate.title} | Certificates | Hasrinata Arya Afendi`,
    description: certificate.description,
  };
};

export default function CertificateDetailPage({ params }: { params: { id: string } }) {
  const certificate = mockCertificates.find((cert) => cert.id === params.id);
  
  if (!certificate) {
    notFound();
  }

  // Find related projects based on technologies
  const relatedProjects = mockProjects.filter(project => 
    project.relatedCertificates?.includes(certificate.id)
  );
  
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4 pl-0 hover:pl-0">
          <Link href="/certificates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Certificates
          </Link>
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold">{certificate.title}</h1>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline">{certificate.platform}</Badge>
          <Badge variant="secondary">{certificate.category}</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 aspect-video flex items-center justify-center bg-muted overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              {/* Certificate image would go here in a real implementation */}
              <p className="text-lg font-medium">Certificate Preview</p>
            </div>
          </Card>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold">About this Certificate</h2>
            <p>{certificate.description}</p>
            <p>This certification validates skills in {certificate.skills.join(", ")}.</p>
            
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Skills Covered</h3>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
          
          {relatedProjects.length > 0 && (
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold">Related Projects</h2>
              <p className="text-muted-foreground">
                Projects that apply the skills learned in this certification
              </p>
              <RelatedProjects projects={relatedProjects} />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Certificate Details</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issued By</span>
                <span className="font-medium">{certificate.issuedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date</span>
                <span>{certificate.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Credential ID</span>
                <span className="font-mono text-sm">{certificate.credentialId}</span>
              </div>
            </div>
            
            <CardContent className="flex justify-end gap-4">
              {certificate.pdfUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link href={certificate.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <FileDown className="h-3.5 w-3.5 mr-1" /> Download Certificate
                  </Link>
                </Button>
              )}
              {certificate.verificationUrl && (
                <Button asChild size="sm">
                  <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                    View Credential <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}