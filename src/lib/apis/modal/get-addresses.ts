import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/modal/user-address';
import { getToken } from '@/lib/utils/get-token';
import { useQuery } from '@tanstack/react-query';

export default async function getAddresses() {
  try {
    const token = await getToken();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses`,
      {
        headers: {
          ...API_HEADER,
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    const data: SuccessResponse<UserAddress> = await response.json();
    if (data.message !== 'success') throw new Error(data.message);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

// Custom Hook
export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
}
