import { getProductStatistics } from '@/lib/apis/dashboard/products-statistics.api';
import LowStockProducts from './_components/low-stock-products';
import TopSellingProducts from './_components/top-selling-products';

export default async function OverViewPage() {
  //  get
  const payload = await getProductStatistics();

  if (!payload || 'error' in payload) {
    return <section>Error loading data</section>;
  }

  return (
    <section className='bg-gray-50 h-screen px-10'>
      {/* top selling and low stock products section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6'>
        <TopSellingProducts products={payload.statistics.topSellingProducts} />
        <LowStockProducts products={payload.statistics.lowStockProducts} />
      </div>
    </section>
  );
}
