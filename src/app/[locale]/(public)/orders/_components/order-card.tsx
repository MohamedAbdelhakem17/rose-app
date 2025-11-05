'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/utils';
import {
  Banknote,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  CreditCard,
  HelpCircle,
  Info,
  Star,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function OrderCard({ order }: { order: MappedOrderType }) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // State
  const [showAll, setShowAll] = useState(false);

  // Variables
  const dateLocale = locale === 'ar' ? 'ar-EG' : 'en-US';

  const formattedDate = new Date(order.createdAt).toLocaleString(dateLocale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const ICONS_MAP: Record<string, React.ElementType> = {
    check: CheckCheck,
    cancel: TriangleAlert,
    pending: Truck,
    unknown: HelpCircle,
  };

  const StatusIcon = ICONS_MAP[order.deliveryStatus?.Icon] || Info;

  // Function
  const toggleShowAll = () => setShowAll(prev => !prev);

  return (
    <div
      key={order._id}
      className='overflow-hidden rounded-lg shadow-md border border-zinc-200'
    >
      {/* Header */}
      <div className='flex items-center justify-between bg-maroon-700 px-5 py-3 text-white'>
        <h3 className='text-2xl font-semibold'>
          {t('order-id', { order: order._id.slice(0, 5) })}
        </h3>

        {/* Created att */}
        <p className='text-sm'>
          {t.rich('order-created-in', {
            date: () => <span className='font-semibold'>{formattedDate}</span>,
          })}
        </p>
      </div>

      {/* Body */}
      <div className='bg-zinc-50 px-5 py-4 space-y-3'>
        {/* Price + status */}
        <div className='flex flex-wrap items-center justify-between border-b border-zinc-200 pb-3'>
          <div className='flex items-center gap-4'>
            {/* Price  */}
            <h3 className='text-lg text-zinc-800'>
              {t.rich('total-price', {
                price: () => (
                  <span className='text-2xl font-bold text-zinc-900'>
                    <span className='text-2xl font-bold text-zinc-900'>
                      {new Intl.NumberFormat(locale).format(order.totalPrice)}
                    </span>
                  </span>
                ),
              })}
            </h3>

            {/* Paid status */}
            {order.isPaid && (
              <Badge className='flex items-center gap-1 bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-600'>
                <Check size={16} />
                {t('is-paid')}
              </Badge>
            )}
          </div>

          {/* Order status */}
          <div className='flex items-center gap-2'>
            {/* Label */}
            <span className='text-sm font-medium text-zinc-800'>
              {t('order-status')}
            </span>

            {/* Status badge */}
            <Badge className='bg-blue-500 px-3 py-1 text-white hover:bg-blue-600'>
              {order.state}
            </Badge>
          </div>
        </div>

        {/* Payment & Delivery */}
        <div className='space-y-1'>
          {/* Payment status */}
          <div className='flex items-center gap-2 text-sm text-zinc-700'>
            <span className='font-medium'>{t('payment-method')}:</span>
            {order.paymentType === 'cash' && <Banknote size={16} />}
            {order.paymentType === 'credit-card' && <CreditCard size={16} />}
            <span className='capitalize'>{order.paymentType}</span>
          </div>

          {/* Delivery status */}
          <div className='flex items-center gap-2 text-sm text-zinc-700'>
            {/* Label */}
            <span className='font-medium'>{t('delivery-status')}:</span>

            {/* Status */}
            <span
              className={cn(
                'flex items-center gap-2 font-medium',
                order.deliveryStatus.color
              )}
            >
              {/* Icon */}
              <StatusIcon className='size-6' />
              {order.deliveryStatus.name}
            </span>
          </div>
        </div>

        {/* Order Items */}
        <div>
          {/* Labels */}
          <p className='mt-2 text-sm font-medium text-zinc-800'>
            {t('order-items')}:
          </p>

          <div
            className={cn(
              'relative mt-3 grid grid-cols-1 gap-4 rounded-xl bg-white p-4 shadow-inner md:grid-cols-2 transition-all duration-300',
              showAll ? 'h-auto' : 'h-64 overflow-hidden'
            )}
          >
            {order.items.map(({ price, product, quantity }) => (
              <div
                key={product._id}
                className='flex h-36 overflow-hidden rounded-md bg-zinc-50 shadow-sm'
              >
                {/* Image */}
                <Image
                  src={product.imgCover}
                  alt={product.title}
                  width={117}
                  height={142}
                  className='h-full w-40 object-cover'
                />

                {/* Product content */}
                <div className='flex flex-col justify-between p-3'>
                  {/* Price and rate */}
                  <div>
                    {/* Price */}
                    <h3 className='font-semibold text-maroon-700 text-lg'>
                      {product.title}
                    </h3>

                    {/* Rate */}
                    <p className='flex items-center gap-1'>
                      {/* Icon */}
                      <Star
                        className='text-yellow-500 fill-yellow-500'
                        size={14}
                      />

                      {/* Rating value */}
                      <span className='text-sm text-zinc-800 font-bold'>
                        {t.rich('rating-label', {
                          value: () =>
                            new Intl.NumberFormat(locale).format(
                              product.rateAvg
                            ),
                        })}
                      </span>

                      {/* Rating count */}
                      <span className='text-blue-600 text-base'>
                        {t.rich('rating-count', {
                          count: () =>
                            new Intl.NumberFormat(locale).format(
                              product.rateCount
                            ),
                        })}
                      </span>
                    </p>
                  </div>

                  {/* Quantity and price */}
                  <p className='text-xl font-bold text-zinc-700'>
                    {/* Quantity */}
                    <span className='text-maroon-r00 text-sm me-2'>
                      (×{new Intl.NumberFormat(locale).format(quantity)})
                    </span>
                    {/* Price */}
                    {new Intl.NumberFormat(locale, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(price)}{' '}
                    {locale === 'ar' ? 'ج.م' : 'EGP'}
                  </p>
                </div>
              </div>
            ))}

            {/* Show all action and layer */}
            {!showAll && (
              <>
                {/* Layer */}
                <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent' />

                {/* Show all action */}
                {order.items.length > 2 && (
                  <button
                    className='absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-medium text-maroon-700 text-center'
                    onClick={toggleShowAll}
                  >
                    {t('show-all')}{' '}
                    <ChevronDown size={16} className='mx-auto' />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Show less action */}
          {showAll && order.items.length > 2 && (
            <div className='mt-4 flex justify-center'>
              <button
                className='flex items-center gap-1 text-sm font-medium text-maroon-700 hover:underline'
                onClick={toggleShowAll}
              >
                {t('show-less')} <ChevronUp size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
