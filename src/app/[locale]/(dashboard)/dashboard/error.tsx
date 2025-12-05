'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Translate
  const t = useTranslations();

  // UseEffect
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body
        className={
          ' flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white text-center p-6'
        }
      >
        <h1 className='text-6xl font-bold text-soft-pink-400 mb-4'>
          {t('error-title')}
        </h1>

        <p className='text-zinc-400 mb-6 max-w-md'>{t('error-description')}</p>

        <div className='flex gap-4'>
          <button
            onClick={() => reset()}
            className='px-6 py-3 bg-soft-pink-400 text-white rounded-full hover:bg-soft-pink-600 transition-colors'
          >
            {t('error-try-again-button')}
          </button>

          <Link
            href='/'
            className='px-6 py-3 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors'
          >
            {t('error-go-home-button')}
          </Link>
        </div>
      </body>
    </html>
  );
}
