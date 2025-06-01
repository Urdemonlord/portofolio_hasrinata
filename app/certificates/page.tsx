import { Suspense } from "react";
import CertificatesPageClient from "@/components/certificates/certificates-page-client";
import CertificatesErrorBoundary from "@/components/certificates/certificates-error-boundary";
import { CertificatesPageSkeleton } from "@/components/certificates/loading-skeletons";

export const metadata = {
  title: "Certificates | Hasrinata Arya Afendi",
  description: "View and download professional certificates earned by Hasrinata Arya Afendi",
};

export default function CertificatesPage() {
  return (
    <div className="page-transition">
      <CertificatesErrorBoundary>
        <Suspense fallback={<CertificatesPageSkeleton />}>
          <CertificatesPageClient />
        </Suspense>
      </CertificatesErrorBoundary>
    </div>
  );
}