import { API_HEADER } from '@/lib/constants/api-header.constant';
import { UserAddress } from '@/lib/types/modal/user-address';
import { useQuery } from '@tanstack/react-query';

export default async function getAddresses() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/addresses`,
      {
        headers: {
          ...API_HEADER,
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZDAxZDc3ZmVlNjhhNGMyZWI3NzZlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIzMTU5OTV9.B0kx-QA6YLX4RpKAaw0Md27W-wdIOK1qJJKU3M-iyeg',
        },
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    const data: ApiResponse<UserAddress> = await response.json();
    if (data.message !== 'success') throw new Error(data.message);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: getAddresses,
  });
}
