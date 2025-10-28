import { ProductSkelton } from '@/components/skeleton';

export default function BestSellingSkeleton() {
  return (
    <div className='col-span-3 flex gap-x-8'>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className='flex-1'>
          <ProductSkelton />
        </div>
      ))}
    </div>
  );
}
