import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret'
    );

    try {
      await jwtVerify(token, secret);
      return NextResponse.json({ authenticated: true });
    } catch (jwtError) {
      return NextResponse.json({ authenticated: false });
    }
  } catch (error) {
    console.error('Auth status error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
