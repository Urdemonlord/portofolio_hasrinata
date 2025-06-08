"use client";

import { useState, useMemo, useCallback } from "react";
import CertificatesFilter from "./certificates-filter";
import CertificatesList from "./certificates-list";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Building, Calendar } from "lucide-react";
import { mockCertificates } from "@/lib/data/certificates";
import { AdminButton } from "@/components/admin/admin-button";

// Add sorting functionality
export default function CertificatesPageClient() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    platform: "all",
    category: "all"
  });

  const [sortBy, setSortBy] = useState("date"); // date, title, platform

  // Calculate statistics with memoization to prevent recalculation
  const stats = useMemo(() => {
    const platforms = new Set(mockCertificates.map(cert => cert.platform));
    const categories = new Set(mockCertificates.map(cert => cert.category));
    const currentYear = new Date().getFullYear();
    const thisYearCerts = mockCertificates.filter(cert => cert.date.includes(currentYear.toString()));
    
    return {
      total: mockCertificates.length,
      platforms: platforms.size,
      categories: categories.size,
      thisYear: thisYearCerts.length
    };
  }, []); // Empty dependency array since mockCertificates is static
  // Optimize callback functions to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSortBy: string) => {
    setSortBy(newSortBy);
  }, []);  return (
    <div className="container py-10 md:py-16 relative page-transition">
      {/* Floating Admin Button */}
      <AdminButton />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Certificates</h1>
          <p className="text-muted-foreground mt-1">
            Browse through my professional certificates and qualifications
          </p>
        </div>
      </div>      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="card-hover animate-slide-in-up" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-slide-in-up" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.platforms}</p>
                <p className="text-xs text-muted-foreground">Platforms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-slide-in-up" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.categories}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover animate-slide-in-up" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{stats.thisYear}</p>
                <p className="text-xs text-muted-foreground">This Year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
        <CertificatesFilter onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <CertificatesList filters={filters} sortBy={sortBy} />
    </div>
  );
}
