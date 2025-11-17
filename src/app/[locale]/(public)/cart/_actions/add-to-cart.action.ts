'use server';

import { revalidatePath } from 'next/cache';

export async function addToCartAction(productId: string) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIyNzU2MTl9.MQWALjbJZjxiOu-SdCj29ZXhPqcpZcYPRVsacqW8Jfc';

  try {
    const response = await fetch(`${process.env.BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        product: productId,
        quantity: 1,
      }),
      cache: 'no-cache',
    });
    if (!response.ok) {
      throw new Error('failed add item to add to cart');
    }
    const data = await response.json();

    revalidatePath('/cart');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
