import React from 'react';
import CategoryItem from './category-item';
import { CategoryStatisticsResponse } from '@/lib/types/dashboard/categories-statistics';
import { ApiError } from '@/lib/types/dashboard/overall-statistics';
import { getCategoryStatistics } from '@/lib/apis/dashboard/category-statistics';

export default async function Categories() {
  // Fetch categories statistics from API
  const data: CategoryStatisticsResponse | ApiError =
    await getCategoryStatistics();

  // Show error message if API fails
  if ('error' in data) {
    return (
      <section className='w-[490px] h-[326px] bg-white rounded-md p-6 grid grid-cols-2 gap-4'>
        {' '}
        <p>{data.error}</p>
      </section>
    );
  }
  // Extract statistics array when API succeeds
  const { statistics } = data;

  return (
    <section className='w-[490px] h-[326px] bg-white text-zinc-800  rounded-md p-6 flex flex-col gap-4 '>
      <h2 className='font-semibold text-2xl font-inter capitalize'>
        all categories
      </h2>
      <div className='category-list overflow-auto hide-scrollbar'>
        {statistics.map(item => (
          <CategoryItem
            key={item._id}
            title={item.name}
            number={item.totalProducts}
          />
        ))}
      </div>
    </section>
  );
}
