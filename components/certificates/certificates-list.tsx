"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, ExternalLink, FileDown, Calendar, Building } from "lucide-react";
import { mockCertificates } from "@/lib/data/certificates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CertificatesListProps {
  filters: {
    searchTerm: string;
    platform: string;
    category: string;
  };
  sortBy: string;
}

// Utility function to highlight matching text - memoized for performance
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">
        {part}
      </span>
    ) : part
  );
};

// Utility function to format date - memoized
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if not a valid date
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return dateString; // Return original if parsing fails
  }
};

function CertificatesList({ filters, sortBy }: CertificatesListProps) {
  const [view, setView] = useState("grid");
  
  // Optimize view change callback
  const handleViewChange = useCallback((newView: string) => {
    setView(newView);
  }, []);
  
  // Filter and sort certificates with optimized memoization
  const filteredCertificates = useMemo(() => {
    if (!filters || !sortBy) return mockCertificates;
    
    let filtered = mockCertificates.filter(certificate => {
      const matchesSearch = !filters.searchTerm || 
        certificate.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        certificate.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        certificate.skills.some(skill => skill.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      const matchesPlatform = !filters.platform || filters.platform === "all" || certificate.platform === filters.platform;
      const matchesCategory = !filters.category || filters.category === "all" || certificate.category === filters.category;
      
      return matchesSearch && matchesPlatform && matchesCategory;
    });

    // Apply sorting with optimized comparison functions
    const sortFunctions = {
      title: (a: any, b: any) => a.title.localeCompare(b.title),
      platform: (a: any, b: any) => a.platform.localeCompare(b.platform),
      date: (a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      }
    };

    const sortFunction = sortFunctions[sortBy as keyof typeof sortFunctions] || sortFunctions.date;
    filtered.sort(sortFunction);

    return filtered;
  }, [filters, sortBy]);
  
  // Memoize certificate count for performance
  const certificateCount = useMemo(() => ({
    filtered: filteredCertificates.length,
    total: mockCertificates.length
  }), [filteredCertificates.length]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {certificateCount.filtered} of {certificateCount.total} certificates
        </p>
        <Tabs defaultValue="grid" value={view} onValueChange={handleViewChange} className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
      <Tabs defaultValue="grid" value={view} className="w-full">
        <TabsContent value="grid" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-background/50">{certificate.platform}</Badge>
                    <Award className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="mt-2 line-clamp-2 hover:text-primary transition-colors">{highlightText(certificate.title, filters.searchTerm)}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3">{highlightText(certificate.description, filters.searchTerm)}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    <Badge variant="secondary">{certificate.category}</Badge>
                    {certificate.credentialId && (
                      <Badge variant="outline" className="text-xs">
                        ID: {certificate.credentialId}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(certificate.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span>{certificate.issuedBy}</span>
                  </div>
                  {/* Skills preview */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {certificate.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{certificate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
                  {certificate.verificationUrl && certificate.verificationUrl !== "#" && (
                    <Button asChild variant="ghost" size="sm">
                      <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                        Verify <ExternalLink className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  )}
                  {certificate.pdfUrl && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={certificate.pdfUrl} target="_blank" rel="noopener noreferrer">
                        Download <FileDown className="h-3.5 w-3.5 ml-1" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-0">
          <div className="space-y-4">
            {filteredCertificates.map((certificate) => (
              <Card key={certificate.id} className="transition-all duration-200 hover:shadow-lg border-border/50 hover:border-border">
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{certificate.platform}</Badge>
                      <Badge variant="secondary">{certificate.category}</Badge>
                      {certificate.credentialId && (
                        <Badge variant="outline" className="text-xs">
                          ID: {certificate.credentialId}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{highlightText(certificate.title, filters.searchTerm)}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{highlightText(certificate.description, filters.searchTerm)}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(certificate.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        <span>{certificate.issuedBy}</span>
                      </div>
                    </div>
                    {/* All skills in list view */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 justify-end">
                    {certificate.verificationUrl && certificate.verificationUrl !== "#" && (
                      <Button asChild variant="ghost" size="sm">
                        <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                          Verify <ExternalLink className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {certificate.pdfUrl && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={certificate.pdfUrl} target="_blank" rel="noopener noreferrer">
                          Download <FileDown className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      )}
    </div>
  );
}

export default memo(CertificatesList);