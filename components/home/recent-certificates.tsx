"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockCertificates } from "@/lib/data/certificates";

export default function RecentCertificates() {
  // Display only the 3 most recent certificates
  const recentCertificates = mockCertificates.slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentCertificates.map((certificate, index) => (
        <Card 
          key={certificate.id} 
          className="flex flex-col h-full card-hover hover-lift animate-slide-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge variant="outline">{certificate.platform}</Badge>
              <Award className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle className="mt-2 line-clamp-2">{certificate.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground">{certificate.description}</p>
            <p className="text-sm mt-2">Issued: {certificate.date}</p>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            {certificate.verificationUrl && certificate.verificationUrl !== "#" && (
              <Button asChild variant="ghost" size="sm">
                <Link href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                  Verify <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            )}
            <Button asChild size="sm">
              <Link href={`/certificates/${certificate.id}`}>
                View <FileText className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}