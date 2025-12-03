/**
 * Server-side API function to fetch a single category by ID
 * Uses BASE_URL (non-public) environment variable for security
 * Safe for server-side use only - no client exposure
 */

import type { Category } from '@/lib/types/filters';

interface GetCategoryByIdResponse {
  success: boolean;
  data: Category;
  message?: string;
}

export async function getCategoryById(categoryId: string): Promise<Category> {
  const baseURL = process.env.BASE_URL;

  if (!baseURL) {
    throw new Error('BASE_URL is not configured');
  }

  const res = await fetch(`${baseURL}/categories/${categoryId}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Category not found');
    }
    throw new Error('Failed to fetch category');
  }

  const data = (await res.json()) as GetCategoryByIdResponse;
  return data.data || (data as any);
}
