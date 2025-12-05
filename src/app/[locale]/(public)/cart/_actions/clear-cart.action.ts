'use server';

import { getToken } from '@/lib/utils/get-token';
import { revalidateTag } from 'next/cache';

export async function clearCartAction() {
  try {
    const jwt = await getToken();

    if (!jwt || !jwt.token) {
      throw new Error('Unauthorized');
    }

    const response = await fetch(`${process.env.BASE_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }

    revalidateTag('cart-data');
    return 'Cart cleared successfully';
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}
