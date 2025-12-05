'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/modal/user-address';
import { getToken } from '@/lib/utils/get-token';

export async function deleteAddress(id: string) {
  try {
    const token = await getToken();
    const response = await fetch(`${process.env.BASE_URL}/addresses/${id}`, {
      method: 'DELETE',
      headers: {
        ...API_HEADER,
        authorization: `Bearer ${token}`,
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
