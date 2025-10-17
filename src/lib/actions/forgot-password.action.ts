'use server';

import { REQUEST_HEADERS } from '../constants/request-headers.constant';

//  Mark single notification as read
async function otpVerification(resetCode: string) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`;

  const response = await fetch(API_URL, {
    method: 'post',
    headers: {
      ...REQUEST_HEADERS,
    },
    body: JSON.stringify({ resetCode }),
  });

  const payload = await response.json();

  return payload;
}

//  Exports
export { otpVerification };
