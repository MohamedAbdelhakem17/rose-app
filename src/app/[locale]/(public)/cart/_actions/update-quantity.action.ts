'use server';

import { revalidateTag } from 'next/cache';

export async function updateQuantity(productId: string, quantity: number , productTitle : string) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIyNzU2MTl9.MQWALjbJZjxiOu-SdCj29ZXhPqcpZcYPRVsacqW8Jfc';

  try {
    const response = await fetch(`${process.env.BASE_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        quantity,
      }),
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
