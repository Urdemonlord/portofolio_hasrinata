"use client";

import { Suspense } from "react";
import { CertificatesPageSkeleton } from "./loading-skeletons";

interface CertificatesPageWrapperProps {
  children: React.ReactNode;
}

export default function CertificatesPageWrapper({ children }: CertificatesPageWrapperProps) {
  return (
    <Suspense fallback={<CertificatesPageSkeleton />}>
      {children}
    </Suspense>
  );
}
