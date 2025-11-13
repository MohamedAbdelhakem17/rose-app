'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/modal/user-address';

export async function deleteAddress(id: string) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        ...API_HEADER,
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZDAxZDc3ZmVlNjhhNGMyZWI3NzZlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIzMTU5OTV9.B0kx-QA6YLX4RpKAaw0Md27W-wdIOK1qJJKU3M-iyeg',
      },
    });
    // console.log(response);
    if (response.ok) {
      const data: ApiResponse<UserAddress> = await response.json();
      return data;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}
