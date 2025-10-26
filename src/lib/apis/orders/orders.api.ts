'use server';

import { REQUEST_HEADERS } from '@/lib/constants/request-headers.constant';
import { getToken } from '@/lib/utils/get-token';

export async function getOrders() {
  try {
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

    // Try parsing the response
    const payload = await response.json().catch(() => null);

    //  Handle API error
    if (!response.ok) {
      // Get error message
      const errorMessage =
        payload?.message ||
        payload?.error ||
        `Failed to fetch orders (status: ${response.status})`;

      return { error: errorMessage };
    }

    //  Return successful payload
    return payload;
  } catch (error) {
    void error;
    return { error: 'Something went wrong while fetching orders.' };
  }
}
