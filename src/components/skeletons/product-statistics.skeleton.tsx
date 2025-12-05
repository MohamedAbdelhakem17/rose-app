import { Skeleton } from '@/components/ui/skeleton';

export default function ProductStatisticsSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
      {[...new Array(2)].map((_, i) => {
        return (
          <div
            key={i}
            className='rounded-md bg-white p-6 space-y-6 col-span-full md:col-span-1'
          >
            {/* Label */}
            <Skeleton className='h-6 w-56' />

            {/* Products list */}
            <ul className='divide-y max-h-[443px] overflow-y-auto pr-2'>
              {[...new Array(5)].map((_, index) => {
                return (
                  <li
                    key={index}
                    className='flex items-center justify-between py-2 my-2.5'
                  >
                    {/* Label skeleton */}
                    <Skeleton className='h-5 w-40' />

                    {/* Count skeleton */}
                    <Skeleton className='h-5 w-16' />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
