import { ProductSkelton } from '@/components/skeletons';
import { Suspense } from 'react';
import ProductList from '../_components/product-list';
import CategoriesListSkeleton from '@/components/skeletons/categories-skeleton';
import CategoriesWrapper from '../_components/categories/categories-wrapper';
import OccasionsWrapper from '../_components/occasions/occasions-wrapper';
import RatingFilter from '../_components/ratings/rating-filter';
import PriceFilter from '../_components/price-filter/price-filter';
import ResetAll from '../_components/reset-all';

export default function Page({
  searchParams,
}: {
  searchParams: GetProductsParams;
}) {
  return (
    <main className='grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1 border-e-1 border-gray-100 space-y-6'>
        {/* Categories */}
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesWrapper />
        </Suspense>

        {/* Occasions */}
        <Suspense fallback={<CategoriesListSkeleton />}>
          <OccasionsWrapper />
        </Suspense>

        {/* Ratings + Reset */}
        <RatingFilter />
        <PriceFilter />
        <ResetAll />
      </div>

      {/* Product list */}
      <section className='col-span-3'>
        <Suspense
          fallback={
            <div className='grid grid-cols-3 gap-4'>
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkelton key={index} />
              ))}
            </div>
          }
        >
          <ProductList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
