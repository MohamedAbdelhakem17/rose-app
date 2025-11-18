'use client';
import ProductCard from '@/components/features/products/product-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductSkelton() {
  return (
    <ProductCard className='bg-white rounded-xl shadow-sm'>
      <ProductCard.Content>
        <Skeleton className='h-72 w-full rounded-t-xl' />
        <br />
        <Skeleton className='h-6 w-3/4 mb-2' />
        <Skeleton className='h-5 w-1/2 mb-4' />
        <div className='flex justify-between items-center'>
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-8 w-20 rounded' />
        </div>
      </ProductCard.Content>
    </ProductCard>
  );
}
