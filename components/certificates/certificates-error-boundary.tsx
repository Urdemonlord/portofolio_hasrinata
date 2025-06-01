"use client";

import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class CertificatesErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Certificates page error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container py-10 md:py-16">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle>Something went wrong</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                There was an error loading the certificates page. This might be due to a performance issue or data loading problem.
              </p>
              {this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => this.setState({ hasError: false })}
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button asChild>
                  <a href="/">Go Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
