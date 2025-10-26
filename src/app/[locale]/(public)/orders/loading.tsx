import { OrderSkeleton } from '@/components/skeletons';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderLoading() {
  return (
    <main className='container py-8 '>
      {/* Label */}
      <Skeleton className='h-9 w-64 mb-6' />

      {/* Items */}
      {/* {Array.from({ length: 2 }).map((_, index) => ( */}
      <OrderSkeleton />
      {/* ))} */}
    </main>
  );
}
