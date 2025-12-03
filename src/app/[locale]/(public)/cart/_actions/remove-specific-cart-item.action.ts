'use server';

import { getToken } from '@/lib/utils/get-token';
import { revalidateTag } from 'next/cache';

export async function removeCartItem(itemId: string, productTitle: string) {
  try {
    const jwt = await getToken();

    if (!jwt || !jwt.token) {
      throw new Error('Unauthorized');
    }

    const response = await fetch(`${process.env.BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove cart item');
    }

    revalidateTag('cart-data');
    return `${productTitle} removed`;
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
}
