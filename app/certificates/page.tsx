import CertificatesList from "@/components/certificates/certificates-list";
import CertificatesFilter from "@/components/certificates/certificates-filter";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export const metadata = {
  title: "Certificates | Hasrinata Arya Afendi",
  description: "View and download professional certificates earned by Hasrinata Arya Afendi",
};

export default function CertificatesPage() {
  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Browse through my professional certificates and qualifications
          </p>
        </div>
        <div className="flex gap-4">
          <Button className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export Latest (PDF)
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Export All (ZIP)
          </Button>
        </div>
      </div>
      
      <CertificatesFilter />
      <CertificatesList />
    </div>
  );
}