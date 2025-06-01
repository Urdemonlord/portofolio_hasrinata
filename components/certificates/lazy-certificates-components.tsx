"use client";

import { lazy, Suspense } from "react";
import { CertificatesPageSkeleton } from "./loading-skeletons";
import CertificatesErrorBoundary from "./certificates-error-boundary";

// Lazy load the heavy components for better performance
const CertificatesFilter = lazy(() => import("./certificates-filter"));
const CertificatesList = lazy(() => import("./certificates-list"));

interface LazyComponentsProps {
  filters: {
    searchTerm: string;
    platform: string;
    category: string;
  };
  sortBy: string;
  onFilterChange: (filters: { searchTerm: string; platform: string; category: string }) => void;
  onSortChange: (sortBy: string) => void;
}

export default function LazyCertificatesComponents({ 
  filters, 
  sortBy, 
  onFilterChange, 
  onSortChange 
}: LazyComponentsProps) {
  return (
    <CertificatesErrorBoundary>
      <Suspense fallback={<CertificatesPageSkeleton />}>
        <CertificatesFilter onFilterChange={onFilterChange} onSortChange={onSortChange} />
        <CertificatesList filters={filters} sortBy={sortBy} />
      </Suspense>
    </CertificatesErrorBoundary>
  );
}
