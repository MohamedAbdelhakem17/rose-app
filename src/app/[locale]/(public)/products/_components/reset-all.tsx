'use client';

import { Button } from '@/components/ui/button';
import useSearchFilter from '@/hooks/use-search-filter';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function ResetAll() {
  const t = useTranslations();
  const searchFilter = useSearchFilter();
  const searchParams = useSearchParams();

  // Check if there are filters excluding "page"
  const hasFilters = Array.from(searchParams.entries()).some(
    ([key, value]) => key !== 'page' && value
  );

  if (!hasFilters) return null;

  return (
    <Button
      variant='destructive'
      onClick={() => searchFilter('products', 'reset', '')}
      className='w-full flex gap-3'
    >
      <RotateCcw size={14} />
      {t('reset-all')}
    </Button>
  );
}
