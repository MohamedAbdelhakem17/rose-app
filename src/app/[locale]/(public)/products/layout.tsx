import CategoriesWrapper from './_components/categories/categories-wrapper';
import RatingFilter from './_components/ratings/rating-filter';
import ResetAll from './_components/reset-all';
import CategoriesListSkeleton from '@/components/skeletons/categories-skeleton';
import React, { Suspense } from 'react';

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1 border-e-1 border-gray-100'>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesWrapper />
        </Suspense>

        <RatingFilter />
        <ResetAll />
      </div>

      {/* Product list */}
      <section className='col-span-3'>{children}</section>
    </main>
  );
}
