// components/coupon/PricingSummary.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

interface PricingSummaryProps {
  subtotal: number;
  discountAmount: number;
  totalAfterDiscount: number;
}

export function PricingSummary({
  subtotal,
  discountAmount,
  totalAfterDiscount,
}: PricingSummaryProps) {
  const t = useTranslations();

  const discountPercent =
    subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;

  return (
    <div className='space-y-3'>
      <div className='flex justify-between items-center'>
        <span className='text-muted-foreground'>{t('coupon-subtotal')}</span>
        <span className='font-semibold'>{subtotal} EGP</span>
      </div>

      {discountAmount > 0 && (
        <>
          <div className='flex justify-between items-center text-red-600'>
            <span className='font-semibold'>
              {discountPercent}% {t('coupon-discount')}
            </span>
            <span className='font-semibold'>-{discountAmount} EGP</span>
          </div>

          <div className='flex items-center gap-3 py-2'>
            <Separator className='flex-1' />
            <span className='text-sm font-semibold text-red-600 whitespace-nowrap'>
              {discountPercent}% {t('coupon-discount-text')}
            </span>
            <Separator className='flex-1' />
          </div>
        </>
      )}

      <div className='flex justify-between items-center pt-2'>
        <span className='text-lg font-bold'>{t('coupon-total')}</span>
        <span className='text-lg font-bold'>{totalAfterDiscount} EGP</span>
      </div>
    </div>
  );
}
