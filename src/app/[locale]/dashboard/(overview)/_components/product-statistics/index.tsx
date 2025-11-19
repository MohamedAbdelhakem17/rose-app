import { Suspense } from 'react';
import ProductStatisticsContent from './product-statistics-content';
import ProductStatisticsSkeleton from './product-statistics.skeleton';

export default function ProductStatisticsSection() {
  return (
    <Suspense fallback={<ProductStatisticsSkeleton />}>
      <ProductStatisticsContent />
    </Suspense>
  );
}
