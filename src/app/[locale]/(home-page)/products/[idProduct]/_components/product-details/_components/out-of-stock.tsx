import { Package } from 'lucide-react';
import React from 'react';

export default function OutOfStock() {
  return (
    //--- Out of Stock Badge ---
    <div className='stock py-2 px-3 ms-0.5 bg-red-50 rounded-full flex items-center justify-center font-medium text-sm text-red-600 gap-1.5 '>
      <Package size={20} className='stroke-red-600' />
      Out of stock
    </div>
  );
}
