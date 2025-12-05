import { Skeleton } from '@/components/ui/skeleton';

export default function OrderSkeleton() {
  return (
    <div className='rounded-xl bg-white shadow-sm space-y-4 my-2'>
      {/* Header Bar */}
      <div className='bg-maroon-600 text-white p-4 rounded-md flex items-center justify-between'>
        <Skeleton className='h-4 w-28 bg-maroon-400' />
        <Skeleton className='h-4 w-32 bg-maroon-400' />
      </div>

      {/* Price & Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-5 w-16 rounded-full' />
        </div>
        <Skeleton className='h-5 w-20 rounded-full' />
      </div>

      {/* Payment & Delivery Info */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-36' />
      </div>

      {/* Items Grid */}
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {[1, 2].map(i => (
          <div
            key={i}
            className='border rounded-md overflow-hidden p-3 space-y-2'
          >
            <Skeleton className='h-28 w-full rounded-md' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/2' />
            <Skeleton className='h-4 w-16' />
          </div>
        ))}
      </div>

      {/* Show More */}
      <div className='flex justify-center mt-2'>
        <Skeleton className='h-4 w-24' />
      </div>
    </div>
  );
}
