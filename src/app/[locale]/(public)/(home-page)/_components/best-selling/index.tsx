import { Suspense } from 'react';
import BestSellingContent from './_components/best-selling-content';
import BestSellingSkeleton from './_components/best-selling.skeleton';
import ProductSlider from './_components/product-slider';

export default async function BestSelling() {
  return (
    <section className='grid grid-cols-4 my-24 gap-x-8'>
      <div className='col-span-1 flex justify-between flex-col pb-2.5'>
        <BestSellingContent />
      </div>

      <Suspense fallback={<BestSellingSkeleton />}>
        {/* ProductSlider Server Component */}
        <ProductSlider />
      </Suspense>
    </section>
  );
}
