import ProductList from '@/app/[locale]/(public)/products/_components/product-list';
import ProductListSkelton from '@/app/[locale]/(public)/products/_components/product-list.skelton';
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
        <Suspense fallback={<ProductListSkelton />}>
          {/* Display data */}
          <ProductList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
