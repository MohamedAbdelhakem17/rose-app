import { getOrders } from '@/lib/apis/orders/orders.api';
import { getTranslations } from 'next-intl/server';

export default async function OrdersPage() {
  // Translation
  const t = await getTranslations();

  // Query
  const payload = await getOrders();

  return (
    <div className='py-8 container'>
      <h1 className='text-5xl font-bold mb-6'>{t('orders-page-title')}</h1>
      <pre>{JSON.stringify(payload, null, 2)}</pre>
    </div>
  );
}
