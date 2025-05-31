"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tighter">Projects</h1>
        <p className="text-muted-foreground mt-1">
          Explore my GitHub projects and contributions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Failed to load projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We encountered an error while fetching your GitHub projects. This might be due to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>GitHub API rate limiting</li>
                <li>Network connectivity issues</li>
                <li>Temporary GitHub service outage</li>
                <li>Invalid GitHub configuration</li>
              </ul>
              
              {process.env.NODE_ENV === "development" && (
                <details className="bg-muted p-4 rounded-md">
                  <summary className="cursor-pointer font-medium">Error Details</summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {error.message}
                  </pre>
                </details>
              )}
              
              <div className="flex gap-2">
                <Button onClick={reset} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button asChild>
                  <a href="https://github.com/Urdemonlord" target="_blank" rel="noopener noreferrer">
                    View GitHub Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
