'use server';

import { getToken } from '@/lib/utils/get-token';
import { revalidatePath } from 'next/cache';

export async function addToCartAction(productId: string) {
  try {
    const jwt = await getToken();

    if (!jwt || !jwt?.token) {
      throw new Error('Unauthorized');
    }

    const response = await fetch(`${process.env.BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.token}`,
      },
      body: JSON.stringify({
        product: productId,
        quantity: 1,
      }),
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }

    const data = await response.json();

    revalidatePath('/cart');

    return data;
  } catch (error) {
    throw error;
  }
}
