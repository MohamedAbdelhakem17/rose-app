'use client';

import { Button } from '@/components/ui/button';
import useSearchFilter from '@/hooks/use-search-filter';
import { Filter, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProductNotFound() {
  // Translation
  const t = useTranslations();
  // Hooks
  const handleFilterChange = useSearchFilter();

  return (
    <div className='min-h-[50vh] flex items-center justify-center bg-background px-4 col-span-3 transition-colors duration-300'>
      <div className='w-full max-w-md text-center space-y-8'>
        {/* Icon */}
        <div className='flex justify-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-muted/10 dark:bg-muted/20 rounded-full blur-2xl' />
            <div className='relative bg-muted/5 dark:bg-muted/10 p-6 rounded-full'>
              <Filter className='w-16 h-16 text-maroon-600 dark:text-soft-pink-200' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='space-y-3'>
          <h1 className='text-3xl font-bold text-foreground dark:text-foreground'>
            {t('not-found-product-title')}
          </h1>
          <p className='text-muted-foreground dark:text-muted-foreground text-base leading-relaxed'>
            {t('product-not-found-info')}
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col gap-3 pt-4'>
          <Button
            className='w-full'
            size='lg'
            variant='primary'
            onClick={() => {
              handleFilterChange('products', 'reset', '');
            }}
          >
            <RefreshCw className='w-4 h-4 me-2' />
            {t('reset-filters-button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
