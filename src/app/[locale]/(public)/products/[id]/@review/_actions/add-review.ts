'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { AddReview } from '@/lib/types/review';

export default async function addReview(body: AddReview) {
  try {
    // Token
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhjM2MzOTlhOGJjYTMwN2Y5ZTM2OTdkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTc2NjAwNTd9.kItrgR8UMmfTI-TyNExypZd9Eu1ZWISHZS8UbR6dgwo';

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
