import { useInfiniteQuery } from '@tanstack/react-query';
import { GetUserNotificationsResponse } from '@/lib/types/user-notification';

export default function useGetAllNotifications() {
  // Get all notification
  const getNotification = async (page: number = 1) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/user-notification?page=${page}&limit=2`;

    const response = await fetch(apiUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const payload: GetUserNotificationsResponse = await response.json();

    return payload;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['notifications'],

    queryFn: ({ pageParam = 1 }) => getNotification(pageParam),

    initialPageParam: 1,

    getNextPageParam: lastPage => {
      if ('error' in lastPage || !lastPage.metadata) return undefined;
      return lastPage.metadata.nextPage ?? undefined;
    },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  };
}
