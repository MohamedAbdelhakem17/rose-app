'use server';

import { REQUEST_HEADERS } from '@/lib/constants/request-headers.constant';
import { getToken } from '@/lib/utils/get-token';

export async function getProductStatistics(): Promise<
  ProductStatisticsResponse | { error: string }
> {
  try {
    const token = await getToken();

    if (!token) {
      return { error: 'Unauthorized: Missing token.' };
    }

    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/statistics/products`;

    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
        Authorization: `Bearer ${token.token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        error: `Failed to fetch product statistics (status: ${response.status})`,
      };
    }
    // Try parsing the response
    const payload: ProductStatisticsResponse = await response.json();

    if ('error' in payload) {
      return { error: payload.error };
    }

    // Return successful payload
    return payload;
  } catch (err) {
    console.error('[getProductStatistics] Error:', err);
    return { error: 'Something went wrong while fetching product statistics.' };
  }
}
