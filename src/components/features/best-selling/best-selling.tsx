import React from 'react';
import BestSellingText from './best-selling-text';
import BestSellingProduct from './best-selling-product';

export default function BestSelling() {
  return (
    <div className='flex flex-row justify-center align-items-center m-auto w-[1281px] gap-9 mb-32'>
      <BestSellingText />
      <BestSellingProduct />
    </div>
  );
}
