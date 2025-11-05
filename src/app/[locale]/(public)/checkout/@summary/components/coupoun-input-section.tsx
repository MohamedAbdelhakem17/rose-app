// components/coupon/CouponInputSection.tsx
'use client';

import { useState } from 'react';
import { TicketPercent, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';

interface CouponInputSectionProps {
  onApply: (code: string) => Promise<void>;
  isLoading: boolean;
}

export function CouponInputSection({
  onApply,
  isLoading,
}: CouponInputSectionProps) {
  const t = useTranslations();
  const [couponCode, setCouponCode] = useState('');

  const handleApply = async () => {
    if (!couponCode.trim()) return;
    await onApply(couponCode);
    setCouponCode('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleApply();
    }
  };

  return (
    <div className='flex gap-3'>
      <Input
        type='text'
        placeholder={t('coupon-input-placeholder')}
        value={couponCode}
        onChange={e => setCouponCode(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className='flex-1'
      />
      <Button
        onClick={handleApply}
        disabled={isLoading || !couponCode.trim()}
        className='bg-red-700 hover:bg-red-800 text-white gap-2'
      >
        {isLoading ? (
          <Loader2 size={18} className='animate-spin' />
        ) : (
          <TicketPercent size={18} />
        )}
        {isLoading ? t('coupon-applying-button') : t('coupon-apply-button')}
      </Button>
    </div>
  );
}
