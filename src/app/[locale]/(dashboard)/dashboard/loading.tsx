import { Loader2Icon } from 'lucide-react';
import React from 'react';

export default function Loading() {
  return (
    <div className=' flex justify-center items-center w-full h-screen'>
      <Loader2Icon
        className='animate-spin text-maroon-600 dark:text-soft-pink-200'
        size={80}
      />
    </div>
  );
}
