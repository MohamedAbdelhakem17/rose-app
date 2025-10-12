'use server';

import { cookies } from 'next/headers';

// get token (for server components or API calls)
export async function getToken() {
  return cookies().get('token')?.value || null;
}

// set token (you can call this after login)
export async function setToken(token: string) {
  cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
}

// delete token (for logout)
export async function clearToken() {
  cookies().delete('token');
}
