import { cn } from '@/lib/utils/utils';
import { MapPin, PenLine, Phone, Trash } from 'lucide-react';
import React from 'react';

export default function AddressCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 border border-zinc-200 dark:border-zinc-600 rounded-xl hover:border-maroon-600 dark:hover:border-soft-pink-400 pl-4 pr-7',
        className
      )}
    >
      {/* Buttons */}

      {/* Edit Address */}
      <div className=' absolute -right-5 top-5 flex justify-center items-center border border-zinc-400  dark:border-zinc-700 p-2.5 bg-zinc-50 rounded-full dark:bg-zinc-400 cursor-pointer'>
        <PenLine className=' text-zinc-800 dark:text-white size-4' />
      </div>

      {/* Delete Address */}
      <div className=' absolute -right-5 bottom-5 flex justify-center items-center  border border-zinc-400  dark:border-zinc-700 p-2.5 text-white bg-red-600 rounded-full cursor-pointer'>
        <Trash className=' size-4' />
      </div>

      {/* Street */}
      <h2 className='absolute -top-6 left-3 text-2xl text-maroon-600 dark:text-soft-pink-400 font-semibold bg-white dark:bg-zinc-800  p-1.5'>
        Home
      </h2>

      {/* City & Phone */}
      <div className=' flex justify-between items-center mt-6'>
        {/* City */}
        <div className=' flex justify-start items-center gap-2.5'>
          <div className=' flex justify-center items-center p-2 text-white bg-emerald-600 rounded-full  '>
            <MapPin className=' size-5 ' />
          </div>

          <h3 className='text-2xl font-semibold'>Giza</h3>
        </div>

        {/* Phone */}
        <div className=' flex justify-start items-center '>
          <Phone size={20} />
          <h3>+2011122234</h3>
        </div>
      </div>

      {/* Address */}
      <div className=' px-3 py-1 w-fit bg-zinc-100 dark:bg-zinc-500 rounded-full mb-5'>
        <h3> Address</h3>
      </div>
    </div>
  );
}
