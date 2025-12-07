'use server';

import { revalidateTag } from 'next/cache';

// -- ACTION TO REMOVE A SPECIFIC PRODUCT -- //
export async function removeProductAction(productId: string) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjdjMDYzOWQ4MzZlZThiZTcwNjE5MGE5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY0OTQ1ODA4fQ.q01IQqn76Tn-RB-yV-3T7aQBES_p-EmX7Jfu8MpQ_II';

  try {
    const response = await fetch(
      `${process.env.BASE_URL}/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to remove product');
    }
    revalidateTag('products');
    return 'Product removed successfully';
  } catch (error) {
    console.error('Error removing product:', error);
  }
}
