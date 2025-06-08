import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function verifyAuth(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      return false;
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret'
    );

    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export function createUnauthorizedResponse() {
  return new Response(
    JSON.stringify({ error: 'Unauthorized access' }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
