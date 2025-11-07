'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/user-address';

export async function AddAddress() {
  try {
    const response = await fetch(`${process.env.BASE_URL}/addresses`, {
      method: 'POST',
      headers: {
        ...API_HEADER,
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZDAxZDc3ZmVlNjhhNGMyZWI3NzZlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIzMTU5OTV9.B0kx-QA6YLX4RpKAaw0Md27W-wdIOK1qJJKU3M-iyeg`,
      },
    });
    // console.log(response);
    if (response.ok) {
      const payload: ApiResponse<UserAddress> = await response.json();
      console.log('-----------------------------\n' + payload);
    }
  } catch (err) {}
}
