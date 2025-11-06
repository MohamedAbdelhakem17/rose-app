'use client';

import { Input } from '@/components/shared';
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

interface ProductPriceProps {
  price: number;
  quantity: number;
}

export default function ProductPrice({ price, quantity }: ProductPriceProps) {
  const [number, setNumber] = useState(quantity);

  const handleIncrease = () => {
    setNumber(c => c + 1);
  };
  

  return (
    <div className='flex justify-between'>
      {/* price */}
      <div className='flex items-end  gap-1'>
        <span className='text-maroon-600 text-sm font-medium'>(×{quantity}) </span>
        <strong className='font-bold text-2xl text-zinc-800'>{price}</strong>
        <span className='text-sm font-medium text-zinc-800'> EGP</span>
      </div>

      {/* quantity selector */}
      <div className='flex gap-2'>
        {/* decrease button */}
        <button
          
          className=' w-12 h-12 font-semibold text-sm rounded-lg bg-maroon-50 text-maroon-600  flex items-center justify-center'
        >
          <Minus size={20} />
        </button>
        <div className='w-[104px] '>
          <Input
            value={number}
            onChange={e => setNumber(Number(e.target.value))}
            type='number'
            className='h-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent text-zinc-700 placeholder:text-zinc-400 bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:focus:ring-zinc-500 dark:placeholder:text-zinc-400 dark:text-zinc-200 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          />
        </div>
        {/* increase button */}

        <button
        onClick={handleIncrease}
        className=' w-12 h-12 font-semibold text-sm rounded-lg  bg-maroon-50 text-maroon-600  flex items-center justify-center'>
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
