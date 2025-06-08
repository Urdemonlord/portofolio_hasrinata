"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Menu, Shield, Star, Settings, Award } from "lucide-react";
import { useAuth } from "@/components/admin/auth-provider";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Certificates", path: "/certificates" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl"></span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 animate-slide-in-up",
                  pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-600/20 rounded-full text-green-600 text-xs font-medium hover:bg-green-600/30">
                  <Shield className="h-3 w-3" />
                  Admin
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin/certificates" className="flex items-center gap-2 cursor-pointer">
                    <Award className="h-4 w-4" />
                    Manage Certificates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/featured-projects" className="flex items-center gap-2 cursor-pointer">
                    <Star className="h-4 w-4" />
                    Featured Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-primary py-2",
                      pathname === item.path
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}