import { decode, JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function getToken(): Promise<JWT | null> {
  // Get user tokens
  const token =
    cookies().get('__Secure-next-auth.session-token')?.value ??
    cookies().get('next-auth.session-token')?.value;

  // if not logged user
  if (!token) return null;

  //  get user token
  try {
    // decode token
    const jwt = await decode({
      token,
      secret: process.env.AUTH_SECRET!,
    });

    // return uer jwt
    return jwt;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
