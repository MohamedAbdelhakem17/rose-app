'use server';

import { REQUEST_HEADERS } from '@/lib/constants/request-headers.constant';
import { getToken } from '@/lib/utils/get-token';
import { mappingOrders } from '@/lib/utils/mapping-order';
import { getTranslations } from 'next-intl/server';

export async function getOrders(): Promise<
  MappedOrderResponse | { error: string }
> {
  try {
    const t = await getTranslations();
    //  Get user token
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const token = await getToken();

    // If user not logged in
    // if (!token) {
    //   return { error: 'Invalid token. Please login again.' };
    // }

    //  Construct API endpoint
    const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders`;

    //  Make API call
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        ...REQUEST_HEADERS,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZDZkZGI3ZmVlNjhhNGMyZWI5NWQ3Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjE0NjE3MDN9.1OTe3mr1K5hjdhvTYhX5HEyan1MH8CdLZGnhbCorXcg`,
      },
    });

    //  Handle API error
    if (!response.ok) {
      // Get error message
      const errorMessage = `Failed to fetch orders (status: ${response.status})`;

      return { error: errorMessage };
    }

    // Try parsing the response
    const payload: GetOrdersResponse = await response.json();

    if ('error' in payload) {
      return { error: payload.error };
    }

    // Map products
    const mappedPayload: MappedOrderResponse = {
      ...payload,
      orders: mappingOrders(payload.orders, t),
    };
    //  Return successful payload
    return mappedPayload;
  } catch (error) {
    void error;
    return { error: 'Something went wrong while fetching orders.' };
  }
}
