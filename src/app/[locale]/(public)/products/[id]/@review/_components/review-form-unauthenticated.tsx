import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { UserX2 } from 'lucide-react';
import React from 'react';
import ReviewForm from './review-form';
import { cn } from '@/lib/utils/utils';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function ReviewFormUnauthenticated() {
  // Locale
  const locale = await getLocale();

  // Translate
  const t = await getTranslations();

  return (
    <div
      className={cn(
        ' mx-5 mt-4 relative',
        locale === 'ar'
          ? 'border-r border-r-zinc-200 dark:border-r-zinc-700'
          : 'border-l border-l-zinc-200 dark:border-l-zinc-700'
      )}
    >
      {/* Background */}
      <ReviewForm className=' absolute top-3 blur-sm' />

      <div className='absolute right-2 left-2 flex flex-col w-full h-[450px] justify-center items-center text-zinc-600 dark:text-zinc-300 gap-2 bg-zinc-300/40 dark:bg-zinc-600/40 rounded-sm'>
        <div className=' flex flex-col justify-center items-center bg-white dark:bg-zinc-600 p-4 gap-3 rounded-sm'>
          <UserX2 size={70} />
          <p className='capitalize text-xl'>{t('rating-unauthorize-p')}</p>
          <Link href={'/login'} className='mt-8 w-full inline-block'>
            <Button variant={'primary'} className=' w-full inline-block'>
              {t('rating-unauthorize-button')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
