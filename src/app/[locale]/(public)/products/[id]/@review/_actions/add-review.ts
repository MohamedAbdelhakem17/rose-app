'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { AddReview } from '@/lib/types/review';
import { getToken } from '@/lib/utils/get-token';

export default async function addReview(body: AddReview) {
  try {
    // Token
    const token = await getToken();
    // Fetch
    const response = await fetch(`${process.env.BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        ...API_HEADER,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // Data
    const payload = await response.json();
    if (payload.err) {
      return payload.err;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}
