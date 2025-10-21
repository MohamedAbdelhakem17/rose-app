'use client';

import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { RefreshCcw, RotateCcw } from 'lucide-react';
import useSearchFilter from '@/hooks/use-search-filter';

export default function ResetAll() {
  const t = useTranslations();

  const searchFilter = useSearchFilter();

  return (
    <Button
      variant='destructive'
      onClick={() => searchFilter('products', 'reset', '')}
      className=' w-full flex gap-3'
    >
      <RotateCcw size={14} />
      {t('reset-all')}
    </Button>
  );
}
