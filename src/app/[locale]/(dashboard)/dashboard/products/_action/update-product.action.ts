'use server';

import { getToken } from '@/lib/utils/get-token';

export default async function updateProduct(id: string, data: FormData) {
  // Token
  const token = await getToken();

  // Fetch
  const request = await fetch(`${process.env.BASE_URL}/product/${id}`, {
    method: 'PUT',
    headers: { Authorization: 'Bearer ' + token },
    body: data,
  });
}
