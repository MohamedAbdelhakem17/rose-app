import React from 'react';
import CategoryItem from './category-item';

export default function Categories() {
  return (
    <section className='w-[490px] h-[326px] bg-white text-zinc-800  rounded-md p-6 flex flex-col gap-4 '>
      <h2 className='font-semibold text-2xl font-inter capitalize'>all categories</h2>
      <div className='category-list overflow-auto hide-scrollbar'>
        <CategoryItem title='Chocolate' number={4} />
        <CategoryItem title='Chocolate' number={4} />
        <CategoryItem title='Chocolate' number={4} />
        <CategoryItem title='Chocolate' number={4} />
        <CategoryItem title='Chocolate' number={4} />
        <CategoryItem title='Chocolate' number={4} />
      </div>
    </section>
  );
}
