import React from 'react';

/* Props for CategoryItem */
interface Iprops {
  title: string;
  number: number;
}
/* Single category list item */
export default function CategoryItem({ title, number }: Iprops) {
  return (
    <div className='flex justify-between items-center pb-2.5 mb-2.5 border-b border-black/8'>
      <h6>{title}</h6>
      <div className='bg-black/5 py-1 px-2 rounded-md text-sm font-medium'>
        <p>{number} products</p>
      </div>
    </div>
  );
}
