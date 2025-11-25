import { ProductStatisticsSkeleton } from '@/components/skeletons';
import { Suspense } from 'react';
import ProductStatisticsContent from './product-statistics-content';

export default function ProductStatisticsSection() {
  return (
    <Suspense fallback={<ProductStatisticsSkeleton />}>
      <ProductStatisticsContent />
    </Suspense>
  );
}
