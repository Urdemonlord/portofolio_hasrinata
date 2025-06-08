'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/admin/auth-provider';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(password);

    if (success) {
      router.push('/admin/certificates');
    } else {
      setError('Invalid password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-300">Enter your password to continue</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-white/20 placeholder-gray-400 text-white bg-white/5 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/certificates"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Certificates
              </Link>
            </div>
          </form>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>Admin access is required to manage certificates and view sensitive data.</p>
        </div>
      </div>
    </div>
  );
}
