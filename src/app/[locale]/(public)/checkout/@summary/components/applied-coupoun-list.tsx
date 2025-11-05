// components/coupon/AppliedCouponsList.tsx
'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { AppliedCoupon } from '@/lib/types/coupouns'; // assuming this type exists

interface AppliedCouponsListProps {
  appliedCoupons: AppliedCoupon[];
  onRemove: (id: string) => void;
}

export function AppliedCouponsList({
  appliedCoupons,
  onRemove,
}: AppliedCouponsListProps) {
  const t = useTranslations();

  return (
    <Card>
      <CardContent className='p-6 min-h-24 flex items-center justify-center'>
        {appliedCoupons.length === 0 ? (
          <p className='text-sm text-muted-foreground'>
            {t('coupon-no-coupons')}
          </p>
        ) : (
          <div className='w-full space-y-3'>
            {appliedCoupons.map(coupon => (
              <div
                key={coupon._id}
                className='flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md'
              >
                <div className='flex-1'>
                  <Badge variant='secondary' className='text-gray-700'>
                    {coupon.coupon.code}
                  </Badge>
                  <p className='text-xs text-muted-foreground mt-1'>
                    -{coupon.discountAmount} EGP
                  </p>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => onRemove(coupon._id)}
                  className='h-6 w-6 p-0 hover:bg-red-50'
                >
                  <X size={16} className='text-red-600' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
