'use server';

import { revalidateTag } from 'next/cache';

export async function removeCartItem(itemId: string , productTitle: string) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIyNzU2MTl9.MQWALjbJZjxiOu-SdCj29ZXhPqcpZcYPRVsacqW8Jfc';
  try {
    const response = await fetch(`${process.env.BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    revalidateTag('cart-data');
    return `${productTitle} removed`;
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}
