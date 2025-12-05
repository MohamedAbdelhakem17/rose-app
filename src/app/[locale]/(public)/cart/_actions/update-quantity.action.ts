'use server';

import { getToken } from '@/lib/utils/get-token';
import { revalidateTag } from 'next/cache';

export async function updateQuantity(
  productId: string,
  quantity: number,
  productTitle: string
) {
  try {
    const jwt = await getToken();

    if (!jwt || !jwt.token) {
      throw new Error('Unauthorized');
    }

    const response = await fetch(`${process.env.BASE_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('failed to update quantity');
    }

    revalidateTag('cart-data');

    return `${productTitle} quantity update successfully`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
