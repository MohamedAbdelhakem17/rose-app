import React, { Suspense } from 'react';
import CategoriesWrapper from './_components/categories/categories-wrapper';
import CategoriesListSkeleton from '../../../../components/skeletons/categories-skeleton';
import RatingFilter from './_components/ratings/rating-filter';
import ResetAll from './_components/reset-all';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-96 bg-muted p-4 border-r'>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesWrapper />
        </Suspense>

        <RatingFilter />
        <ResetAll />
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 bg-background'>{children}</main>
    </div>
  );
}
