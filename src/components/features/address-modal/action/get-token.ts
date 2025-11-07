'use server';

import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export async function GetToken() {
  // Build cookie header from current request
  const cookieHeader = cookies()
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ');

  // Get token from NextAuth cookie
  const token = await getToken({
    req: {
      headers: {
        cookie: cookieHeader,
      },
    } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    throw new Error('Unauthorized – No token found');
  }
  return token;
}