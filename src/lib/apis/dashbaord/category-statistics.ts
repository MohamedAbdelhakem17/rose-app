import { CategoryStatisticsResponse } from '@/lib/types/dashboard/categories-statistics';
import { ApiError } from '@/lib/types/dashboard/overall-statistics';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjI0MjQzMDl9.0tYKHrz6liDX-0U_XLsrroB7ISnmChOip5evszIyiag`;

export async function getCategoryStatistics(): Promise<
  CategoryStatisticsResponse | ApiError
> {
  // Make API request to categories statistics endpoint
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/statistics/categories`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Parse JSON from API response
    const data = await response.json();

    // If API returned an error structure
    if ('error' in data) return data as ApiError;

    // Success: return typed statistics response
    return data as CategoryStatisticsResponse;

    // Log error and return standardized error object
  } catch (error) {
    console.error(error);
    return { error: 'Something went wrong' } as ApiError;
  }
}
