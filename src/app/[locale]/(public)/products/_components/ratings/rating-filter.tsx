'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import FilterHeader from '../_shared/filter-header';
import StarRating from './star-rating';
import { RatingFilterProps } from '@/lib/types/filters';
import useSearchFilter from '@/hooks/use-search-filter';

export default function RatingFilter({ max = 5 }: RatingFilterProps) {
  // Translations
  const t = useTranslations();
  // Navigations
  const searchParams = useSearchParams();
  const searchFilter = useSearchFilter();

  // ✅ Safely convert rating to number
  const ratingParam = searchParams.get('rateAvg');
  const rating =
    ratingParam && !isNaN(Number(ratingParam)) ? Number(ratingParam) : 0;

  return (
    <main className='flex flex-col gap-4 py-section-xs'>
      <FilterHeader
        title={t('ratings-title')}
        className='w-full'
        onReset={() => searchFilter('products', 'rateAvg', '')}
        showReset={!!ratingParam}
      />

      <StarRating
        max={max}
        value={rating}
        onChange={value => {
          searchFilter('products', 'rateAvg', String(value));
        }}
      />
    </main>
  );
}
