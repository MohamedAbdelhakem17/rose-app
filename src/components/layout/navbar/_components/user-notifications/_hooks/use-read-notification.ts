import {
  markAllNotificationReadAction,
  markNotificationReadAction,
} from '@/lib/actions/user-notification.action';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type FunctionType = {
  type: 'all' | 'single';
  id?: string;
};

export default function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  const { mutate: markNotificationRead } = useMutation({
    mutationFn: async ({ type, id }: FunctionType) => {
      switch (type) {
        case 'all':
          return await markAllNotificationReadAction();

        case 'single':
          if (!id)
            throw new Error('Notification ID is required for single type');
          return await markNotificationReadAction(id);

        default:
          throw new Error(`Unknown type: ${type}`);
      }
    },

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['notifications', 'unread-notification-count'],
      });
    },
  });

  return { markNotificationRead };
}
