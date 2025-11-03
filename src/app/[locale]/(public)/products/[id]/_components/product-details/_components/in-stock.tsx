import { Package } from 'lucide-react';
import React from 'react';

//-- Component Props ---
interface InStockProps {
  quantity: number;
}

export default function InStock({ quantity }: InStockProps) {
  return (
    //--- In Stock Badge ---
    <div className='stock py-2 px-3 ms-0.5 bg-zinc-100 rounded-full flex items-center justify-center font-medium text-sm text-zinc-800 gap-1.5 '>
      <Package size={20} className='stroke-zinc-500' />
      {quantity} left in stock
    </div>
  );
}
