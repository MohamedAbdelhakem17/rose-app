'use server';

import { getToken } from 'next-auth/jwt';

export async function GetToken() {
  const token = await getToken({ req });
  return token
}
