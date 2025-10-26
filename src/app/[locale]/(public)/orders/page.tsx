import { getOrders } from '@/lib/apis/orders/orders.api';
import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function OrdersPage() {
  // Translation
  const t = await getTranslations();

  // Query
  const payload: MappedOrderResponse =
    (await getOrders()) as MappedOrderResponse;

  return (
    <div className='py-8 container'>
      <h1 className='text-5xl font-bold mb-6'>{t('orders')}</h1>

      <div className='space-y-6'>
        {payload?.orders.map(order => {
          // const StatusIcon = order.deliveryStatus?.Icon?.render || Info
          const StatusIcon = order.deliveryStatus?.Icon || Info;

          return (
            <div
              key={order._id}
              className='border rounded-2xl p-5 shadow-sm hover:shadow-md transition '
            >
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-semibold'>
                  Order {order.orderNumber}
                </h2>
                <div className='flex items-center gap-2'>
                  <StatusIcon
                    className={`w-5 h-5 ${order.deliveryStatus?.color}`}
                  />
                  <span
                    className={`font-medium ${order.deliveryStatus?.color}`}
                  >
                    {order.deliveryStatus?.name}
                  </span>
                </div>
              </div>

              <div className='text-gray-600 text-sm mb-2'>
                Payment: {order.paymentType} |{' '}
                {order.isPaid ? (
                  <span className='text-green-600'>Paid</span>
                ) : (
                  <span className='text-red-600'>Unpaid</span>
                )}
              </div>

              <div className='text-gray-600 text-sm mb-4'>
                Total:{' '}
                <span className='font-semibold'>{order.totalPrice} EGP</span>
              </div>

              <div className='border-t pt-3 space-y-2'>
                {order.items.map(
                  (item: MappedProductOrderItemType, idx: number) => (
                    <div key={idx} className='flex items-center gap-4'>
                      <Image
                        src={item.product.imgCover}
                        alt={item.product.title}
                        className='w-16 h-16 object-cover rounded-md'
                        width={300}
                        height={300}
                      />
                      <div className='flex-1'>
                        <p className='font-medium'>{item.product.title}</p>
                        <p className='text-sm text-gray-500'>
                          Qty: {item.quantity} × {item.price} EGP
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <p className='text-xs text-gray-400 mt-3'>
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
