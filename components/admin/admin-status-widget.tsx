'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '@/components/admin/auth-provider';

export function AdminStatusWidget() {
  const { isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <div className="fixed top-20 right-4 z-40 flex items-center gap-2 bg-green-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-lg animate-slide-in-right">
      <Shield className="h-4 w-4" />
      <span className="text-sm font-medium">Admin Mode</span>
      <CheckCircle className="h-4 w-4 text-green-200" />
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 text-white hover:bg-white/20 ml-2"
      >
        {isLoggingOut ? (
          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <LogOut className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
