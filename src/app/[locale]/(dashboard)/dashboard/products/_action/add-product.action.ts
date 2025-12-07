'use server';

import { getToken } from '@/lib/utils/get-token';

export default async function addProductAction(data: FormData) {
  try {
    // Token
    const token = await getToken();

    // Fetch
    const response = await fetch(`${process.env.BASE_URL}/products`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: data,
    });

    // Payload
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || 'Failed to add product');
  } catch (err: any) {
    throw new Error(
      err.message || 'Something went wrong while adding the product'
    );
  }
}
