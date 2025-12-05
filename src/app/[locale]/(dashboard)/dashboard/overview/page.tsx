import AreaChart from '../../_components/area-chart/area-chart';
import OrdersStatusChart from '../../_components/order-status-chart';
import ProductStatisticsSection from './_components/product-statistics/index';

export default async function OverViewPage() {
  return (
    <section className='bg-gray-50 h-screen px-10'>
      {/* top selling and low stock products section */}
      <ProductStatisticsSection />
      <OrdersStatusChart />
      <AreaChart />
    </section>
  );
}
