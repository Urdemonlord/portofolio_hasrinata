import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CertificateCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-5" />
        </div>
        <Skeleton className="h-6 w-full mt-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="flex-1">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <div className="flex gap-2 border-t pt-4 px-6 pb-6">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </Card>
  );
}

export function CertificatesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CertificateCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CertificatesFilterSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

export function CertificatesPageSkeleton() {
  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <div>
                  <Skeleton className="h-8 w-8 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <CertificatesFilterSkeleton />
      <CertificatesGridSkeleton />
    </div>
  );
}
