import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for auth token
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the token
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'fallback-secret'
      );
      
      await jwtVerify(token, secret);
      
      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      // Clear the invalid token
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
