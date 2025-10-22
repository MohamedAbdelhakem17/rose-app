import ProductList from './_components/product-list';
import { ProductSkelton } from '@/components/skeleton';
import { Suspense } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: GetProductsParams;
}) {
  return (
    <main className='grid grid-cols-4 gap-x-6 py-16 px-20'>
      {/* Product filter */}
      <div className='col-span-1'>Filter</div>

      {/* Product list */}
      <section className='col-span-3'>
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
      </section>
    </main>
  );
}
