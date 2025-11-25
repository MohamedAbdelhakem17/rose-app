import { getProductStatistics } from '@/lib/apis/dashboard/products-statistics.api';
import { redirect } from 'next/navigation';
import LowStockProducts from './low-stock-products';
import TopSellingProducts from './top-selling-products';

export default async function ProductStatisticsContent() {
  // Query
  const payload = await getProductStatistics();

  // Error or unauthorized
  if (!payload || 'error' in payload) {
    return (
      <div className=' flex justify-center items-center'>
        <p className=' text-center text-4xl text-maroon-500 h-screen mt-auto'>
          {payload.error}
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
      <TopSellingProducts products={payload.statistics.topSellingProducts} />
      <LowStockProducts products={payload.statistics.lowStockProducts} />
    </div>
  );
}
