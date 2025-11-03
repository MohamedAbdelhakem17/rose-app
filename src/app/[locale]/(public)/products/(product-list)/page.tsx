import { ProductSkelton } from '@/components/skeleton';
import { Suspense } from 'react';
import ProductList from '../_components/product-list';

export default function Page({
  searchParams,
}: {
  searchParams: GetProductsParams;
}) {
  return (
    <>
      {/* Loading skelton */}
      <Suspense
        fallback={
          <div className='grid grid-cols-3 gap-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkelton key={index} />
            ))}
          </div>
        }
      >
        {/* Display data */}
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
