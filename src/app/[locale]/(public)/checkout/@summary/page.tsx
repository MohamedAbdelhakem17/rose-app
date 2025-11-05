// components/coupon/CouponSummary.tsx
'use client';

import { useTranslations } from 'next-intl';
import { CouponSummaryProps } from '@/lib/types/coupouns';
import { useCouponDiscount } from '@/hooks/use-coupoun-discount';
import { CouponInputSection } from './components/coupoun-input-section';
import { AppliedCouponsList } from './components/applied-coupoun-list';
import { PricingSummary } from './components/pricing-summary';
import { CouponErrorAlert } from './components/coupoun-error-alert';

// Sub-components

export default function CouponSummary({ subtotal = 250 }: CouponSummaryProps) {
  const t = useTranslations();

  const {
    appliedCoupons,
    discountAmount,
    totalAfterDiscount,
    isLoading,
    error,
    applyCoupon,
    removeCoupon,
  } = useCouponDiscount(subtotal);

  return (
    <div className='w-full max-w-md'>
      <h2 className='text-2xl font-bold mb-6'>{t('coupon-summary-title')}</h2>

      <CouponErrorAlert error={error} />

      <CouponInputSection onApply={applyCoupon} isLoading={isLoading} />

      <div className='my-6'>
        <AppliedCouponsList
          appliedCoupons={appliedCoupons}
          onRemove={removeCoupon}
        />
      </div>

      <PricingSummary
        subtotal={subtotal}
        discountAmount={discountAmount}
        totalAfterDiscount={totalAfterDiscount}
      />
    </div>
  );
}
