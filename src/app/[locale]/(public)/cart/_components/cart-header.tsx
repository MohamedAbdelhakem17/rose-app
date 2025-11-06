
import React from 'react';
import ClearCart from './clear-cart';



export default function CartHeader({ numberOfItem }: { numberOfItem: number }) {
  return (
    //**  Cart Header Section */
    <section>

      <div className='flex justify-between items-center '>
        <div className='flex gap-2.5 items-end'>
          <h1 className='font-bold text-5xl text-zinc-800'>Cart</h1>
          <span className='font-semibold text-base text-zinc-400 '>
            {numberOfItem} {numberOfItem === 1 ? 'product' : 'products'}
          </span>
        </div>
       {/* // Clear Cart Button */}
       <ClearCart />
      </div>
      
    </section>
  );
}
