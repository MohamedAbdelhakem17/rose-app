import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';
import AddressCard from '../address-card';

export default function AddAddressStep() {
  return (
    <DialogContent>
      {/* Header */}
      <DialogHeader className=' flex-col'>
        <DialogTitle>Add A New Addresses</DialogTitle>
        <div className='flex justify-start items-center w-full '>
          <div className='w-1/3 border-t-8 border-maroon-600 dark:border-soft-pink-400 rounded-l-full'></div>
          <div className=' flex justify-center items-center px-2 rounded-full bg-maroon-600 text-white dark:bg-soft-pink-400'>
            <p>1</p>
          </div>
          <div className='w-1/3 border-t-8 border-zinc-200 dark:border-zinc-600'></div>
          <div className=' flex justify-center items-center px-2 rounded-full bg-zinc-200 text-zinc-500 dark:bg-zinc-600'>
            <p>2</p>
          </div>
          <div className='w-1/3 border-t-8 border-zinc-200 dark:border-zinc-600 rounded-r-full'></div>
        </div>
      </DialogHeader>
      <AddressCard />
      {/* Address Cards */}
    </DialogContent>
  );
}
