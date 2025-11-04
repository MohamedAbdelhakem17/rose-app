import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  // Translate
  const t = await getTranslations();

  return (
    <html>
      <body>
        <div className='flex flex-col items-center justify-center min-h-screen bg-zinc-800  text-white text-center p-6'>
          {/* Code */}
          <h1 className=' font-edwardian text-5xl pb-5'>
            <span className='text-soft-pink-700'>4o4</span> Error
          </h1>

          {/* Title */}
          <h1 className='text-4xl font-bold mb-2'>{t('not-found-title')}</h1>

          {/* Description */}
          <p className='text-muted-foreground mb-6 max-w-md'>
            {t('not-found-description')}
          </p>

          {/* Back Home Button */}
          <Link
            href='/'
            className='px-6 py-3 bg-soft-pink-400 text-white rounded-full hover:bg-soft-pink-600 transition-colors'
          >
            {t('not-found-button')}
          </Link>
        </div>
      </body>
    </html>
  );
}
