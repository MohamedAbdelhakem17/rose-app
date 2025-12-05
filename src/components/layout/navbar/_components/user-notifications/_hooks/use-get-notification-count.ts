import { GetUnreadNotificationUserCountResponse } from '@/lib/types/user-notification';
import { useQuery } from '@tanstack/react-query';

export default function useGetNotificationCount() {
  const { data: unreadNotificationCount } = useQuery({
    queryKey: ['unread-notification-count'],

    queryFn: async () => {
      const url =
        process.env.NEXT_PUBLIC_SITE_URL + '/api/user-notification/count';
      const response = await fetch(url);

      const payload: GetUnreadNotificationUserCountResponse =
        await response.json();

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload.unreadCount;
    },
  });

  return { unreadNotificationCount };
}
