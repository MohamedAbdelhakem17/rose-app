import { getOrders } from '@/lib/apis/orders/orders.api';
import { getTranslations } from 'next-intl/server';
import OrderCard from './_components/order-card';

export default async function OrdersPage() {
  // Translation
  const t = await getTranslations();

  // Query
  const payload = (await getOrders()) as MappedOrderResponse;

  return (
    <main className='container flex-1 py-8'>
      <h1 className='mb-6 text-5xl font-bold'>{t('orders')}</h1>

      <div className='space-y-4'>
        {payload.orders.map((order: MappedOrderType) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </main>
  );
}
