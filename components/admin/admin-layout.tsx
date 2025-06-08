"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Star, 
  Award, 
  Home, 
  BarChart3,
  ChevronLeft 
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNavItems = [
  { 
    name: "Dashboard", 
    path: "/admin", 
    icon: BarChart3,
    description: "Overview and statistics" 
  },
  { 
    name: "Featured Projects", 
    path: "/admin/featured-projects", 
    icon: Star,
    description: "Manage homepage projects" 
  },
  { 
    name: "Certificates", 
    path: "/admin/certificates", 
    icon: Award,
    description: "Manage achievements" 
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="border-b bg-muted/30">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              View Portfolio
            </Link>
          </Button>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    
                    return (
                      <Link key={item.path} href={item.path}>
                        <div className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-muted"
                        )}>
                          <Icon className="h-4 w-4" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.name}
                            </p>
                            <p className={cn(
                              "text-xs truncate",
                              isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                            )}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
