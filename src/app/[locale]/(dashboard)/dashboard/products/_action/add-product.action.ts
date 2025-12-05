'use server';

import { getToken } from '@/lib/utils/get-token';

export default async function addProduct(data: FormData) {
  const token = getToken();
  const request = await fetch(`${process.env.BASE_URL}/products`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
    body: data,
  });
}
