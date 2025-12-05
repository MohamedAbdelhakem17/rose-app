'use client';

import { Input } from '@/components/ui/Input';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import FilterHeader from '../_shared/filter-header';

export default function PriceFilter() {
  //translations
  const t = useTranslations();
  //navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial price values from URL if available
  const minParam = searchParams.get('price[gte]') ?? '';
  const maxParam = searchParams.get('price[lte]') ?? '';

  // Local state for min/max inputs
  const [min, setMin] = useState(minParam);
  const [max, setMax] = useState(maxParam);

  // Keep state in sync with URL whenever it changes externally
  useEffect(() => {
    setMin(minParam);
    setMax(maxParam);
  }, [minParam, maxParam]);

  // Apply both filters (min & max) to the URL query
  const applyBothFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Handle minimum price
    if (!min) params.delete('price[gte]');
    else params.set('price[gte]', min);

    // Handle maximum price
    if (!max) params.delete('price[lte]');
    else params.set('price[lte]', max);

    // Reset pagination on filter change
    params.delete('page');

    // Build final URL and navigate
    const q = params.toString();
    const url = q ? `/products?${q}` : '/products';
    router.push(url, { scroll: false });
  };

  // Trigger filter on blur
  const handleBlur = () => applyBothFilters();

  // Trigger filter when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applyBothFilters();
  };

  // Clear both fields and reset filters
  const handleReset = () => {
    setMin('');
    setMax('');

    const params = new URLSearchParams(searchParams);
    params.delete('price[gte]');
    params.delete('price[lte]');
    params.delete('page');

    const q = params.toString();
    const url = q ? `/products?${q}` : '/products';
    router.push(url, { scroll: false });
  };

  // Show reset button only when there’s an active filter
  const showReset = !!min || !!max;

  return (
    <main className='flex flex-col gap-4 py-section-xs'>
      {/* Header with reset option */}
      <FilterHeader
        title={t('price-title')}
        className='w-full'
        onReset={handleReset}
        showReset={showReset}
      />

      {/* Input fields for min/max price */}
      <div className='flex items-center gap-4'>
        <label className='flex flex-col w-full text-sm'>
          <span className='mb-1 text-gray-600'>{t('from')}</span>
          <Input
            type='number'
            name='price[gte]'
            placeholder={t('price-min-placeholder')}
            value={min}
            onChange={e => setMin(e.target.value)}
            onKeyDown={handleKeyDown}
            className='w-full no-spinner'
          />
        </label>

        <label className='flex flex-col w-full text-sm'>
          <span className='mb-1 text-gray-600'>{t('to')}</span>
          <Input
            type='number'
            name='price[lte]'
            placeholder={t('price-max-placeholder')}
            value={max}
            onChange={e => setMax(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className='w-full no-spinner'
          />
        </label>
      </div>
    </main>
  );
}
