import { ProductSkelton } from '@/components/skeleton';
import { getOccasions } from '@/lib/apis/occasions/occasions.api';
import { cn } from '@/lib/utils/utils';
import { MoveRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Suspense } from 'react';
import MostPopularHeader from './_components/most-popular-header';
import MostPopularProduct from './_components/most-popular-product';

export default async function MostPopular({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  // translation
  const t = await getTranslations();
  const locale = await getLocale();

  getOccasions();
  return (
    <>
      <section className='grid grid-cols-4 gap-x-8 gap-y-4'>
        {/* Header */}
        <MostPopularHeader />

        {/* Products */}
        <Suspense
          fallback={Array.from({ length: 6 }).map((_, index) => (
            <ProductSkelton key={index} />
          ))}
        >
          <MostPopularProduct searchParams={searchParams} />
        </Suspense>
      </section>

      {/* Footer */}
      <Link
        href='/products'
        className='text-maroon-700 text-base font-semibold flex justify-end hover:text-maroon-500'
      >
        {t('view-more-link')}
        <MoveRight
          className={cn(['ms-2.5'], locale === 'ar' && '-scale-100')}
        />
      </Link>
    </>
  );
}
