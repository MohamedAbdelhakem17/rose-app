'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Translation
  const t = useTranslations();

  const handleReload = () => {
    reset();
    window.location.reload();
  };

  return (
    <div className='min-h-[50vh] flex items-center justify-center bg-background px-4 col-span-3 transition-colors duration-300'>
      <div className='w-full max-w-md text-center space-y-8'>
        {/* Icon */}
        <div className='flex justify-center'>
          <div className='relative'>
            <div className='absolute inset-0 bg-red-500/10 dark:bg-red-400/20 rounded-full blur-2xl' />
            <div className='relative bg-muted/5 dark:bg-muted/10 p-6 rounded-full'>
              <AlertTriangle className='w-16 h-16 text-red-600 dark:text-red-400' />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='space-y-3'>
          <h1 className='text-3xl font-bold text-foreground dark:text-foreground'>
            {error.message ||
              t('error-title', { defaultMessage: 'Something went wrong' })}
          </h1>
          <p className='text-muted-foreground dark:text-muted-foreground text-base leading-relaxed'>
            {t('error-description', {
              defaultMessage:
                'An unexpected error occurred. Please try again or reload the page.',
            })}
          </p>
        </div>

        {/* Actions */}
        <div className='flex flex-col gap-3 pt-4'>
          <Button
            className='w-full'
            size='lg'
            variant='destructive'
            onClick={handleReload}
          >
            <RefreshCw className='w-4 h-4 me-2' />
            {t('reload-button', { defaultMessage: 'Reload Page' })}
          </Button>
        </div>
      </div>
    </div>
  );
}
