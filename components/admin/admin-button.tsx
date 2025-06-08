'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Settings, Lock, LogOut } from 'lucide-react';
import { useAuth } from '@/components/admin/auth-provider';

export function AdminButton() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  if (isLoading) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-600 animate-pulse" />
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/admin/login">
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-orange-600 hover:bg-orange-700 animate-float"
          title="Admin Login Required"
        >
          <Lock className="h-6 w-6" />
        </Button>
      </Link>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {showLogout && (
        <Button
          onClick={logout}
          size="icon"
          variant="destructive"
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-slide-in-up"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      )}
      
      <Link href="/admin/certificates">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-green-600 hover:bg-green-700 animate-float"
          title="Admin Panel"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
