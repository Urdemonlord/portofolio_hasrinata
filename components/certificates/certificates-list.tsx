"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, ExternalLink, FileDown, FileText } from "lucide-react";
import { mockCertificates } from "@/lib/data/certificates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CertificatesList() {
  const [view, setView] = useState("grid");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {mockCertificates.length} certificates
        </p>
        <Tabs defaultValue="grid" value={view} onValueChange={setView} className="w-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="grid" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCertificates.map((certificate) => (
            <Card key={certificate.id} className="flex flex-col h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{certificate.platform}</Badge>
                  <Award className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-2 line-clamp-2">{certificate.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{certificate.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary">{certificate.category}</Badge>
                </div>
                <p className="text-sm mt-3">Issued: {certificate.date}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 border-t pt-4">
                <Button asChild variant="ghost" size="sm">
                  <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                    Verify <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="#">
                    Download <FileDown className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={`/certificates/${certificate.id}`}>
                    View <FileText className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="list" className="mt-6">
        <div className="space-y-4">
          {mockCertificates.map((certificate) => (
            <Card key={certificate.id} className="transition-all hover:shadow-md">
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{certificate.platform}</Badge>
                    <Badge variant="secondary">{certificate.category}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{certificate.description}</p>
                  <p className="text-sm mt-2">Issued: {certificate.date}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 justify-end">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                      Verify <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="#">
                      Download <FileDown className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href={`/certificates/${certificate.id}`}>
                      View <FileText className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>
    </div>
  );
}