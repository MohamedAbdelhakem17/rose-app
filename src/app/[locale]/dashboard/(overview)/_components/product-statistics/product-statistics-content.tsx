import { getProductStatistics } from '@/lib/apis/dashboard/products-statistics.api';
import LowStockProducts from './low-stock-products';
import TopSellingProducts from './top-selling-products';

export default async function ProductStatisticsContent() {
  //  Query
  const payload = await getProductStatistics();

  // Error Case
  if (!payload || 'error' in payload) {
    return <section>Error loading data</section>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
      <TopSellingProducts products={payload.statistics.topSellingProducts} />
      <LowStockProducts products={payload.statistics.lowStockProducts} />
    </div>
  );
}
