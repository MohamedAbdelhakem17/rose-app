'use client';
import { UserNotifications } from './_components/user-notification';
import { Loader2Icon } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGetAllNotifications from './_hooks/use-get-all-notification';
import { NotificationType } from '@/lib/types/user-notification';

export default function Notifications() {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetAllNotifications();

  // collect All Notification
  const allNotifications: NotificationType[] =
    data?.pages.flatMap(page =>
      'notifications' in page ? page.notifications : []
    ) || [];

  // Initial loading state
  if (isLoading)
    return <Loader2Icon className='animate-spin w-6 h-6 mx-auto' />;

  return (
    <UserNotifications>
      <UserNotifications.Trigger />
      <UserNotifications.Menu>
        <UserNotifications.Header />
        <InfiniteScroll
          dataLength={allNotifications.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            <p className='text-center text-zinc-500 text-sm p-2'>Loading ..</p>
          }
          endMessage={
            <p className='text-center text-zinc-500 text-sm p-2'>
              No more notifications
            </p>
          }
        >
          <UserNotifications.List notifications={allNotifications} />
        </InfiniteScroll>
      </UserNotifications.Menu>
    </UserNotifications>
  );
}
