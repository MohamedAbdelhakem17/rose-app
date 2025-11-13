import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function AddressModalSkeleton() {
  return (
    <div className=' flex flex-col justify-center items-start'>
      <div className=' flex justify-between items-center w-full'>
        <div className=' flex justify-start items-center'>
          <Skeleton className=' size-4 rounded-full' />
          <Skeleton className=' w-6 h-3' />
        </div>
        <div>
          <Skeleton className=' size-4 rounded-full' />
          <Skeleton className=' w-6 h-3' />
        </div>
        <Skeleton className=' w-10 h-3' />
      </div>
    </div>
  );
}
