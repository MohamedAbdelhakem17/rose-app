'use server';

import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/modal/user-address';
import { getToken } from '@/lib/utils/get-token';

export async function addAddress(body: BodyAddModal) {
  try {
    const token = await getToken();

    const response = await fetch(`${process.env.BASE_URL}/addresses`, {
      method: 'PATCH',
      headers: {
        ...API_HEADER,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    // console.log(response);

    if (response.ok) {
      const data: ApiResponse<UserAddress> = await response.json();
      return data;
    } else {
      throw new Error(`${response.status} Unauthorized`);
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}
