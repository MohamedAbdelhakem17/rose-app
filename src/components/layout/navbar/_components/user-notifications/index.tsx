'use client';
import { NotificationType } from '@/lib/types/user-notification';
import { Loader2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserNotifications } from './_components/user-notification';
import useGetAllNotifications from './_hooks/use-get-all-notification';

export default function Notifications() {
  // Hooks
  const { status } = useSession();
  const isAuth = status === 'authenticated';

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetAllNotifications({ isAuth: Boolean(isAuth) });

  // collect All Notification
  const allNotifications = useMemo<NotificationType[]>(() => {
    return (
      data?.pages.flatMap(page =>
        'notifications' in page ? page.notifications : []
      ) || []
    );
  }, [data]);

  if (!isAuth) return null;

  // Initial loading state
  if (isLoading) return <Loader2Icon className='animate-spin h-8 w-8 me-1 ' />;

  return (
    <UserNotifications id={'notificationContainer'}>
      <UserNotifications.Trigger />
      <UserNotifications.Menu>
        <UserNotifications.Header />
        <InfiniteScroll
          dataLength={allNotifications.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            <p className='text-center text-zinc-500 dark:text-white  text-sm p-2'>
              Loading ..
            </p>
          }
          endMessage={
            allNotifications.length !== 0 ? (
              <p className='text-center text-zinc-500 text-sm p-2'>
                No more notifications
              </p>
            ) : (
              ''
            )
          }
          scrollableTarget='notificationContainer'
        >
          <UserNotifications.List notifications={allNotifications} />
        </InfiniteScroll>
      </UserNotifications.Menu>
    </UserNotifications>
  );
}
