import SmallSectionHeading from '@/components/shared/small-section-heading';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/utils';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function BestSellingContent() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <div>
        {/* Sub title */}
        <SmallSectionHeading heading={t('best-selling-sub-title')} />

        {/* Main Text */}
        <h2
          className={cn([
            'text-maroon-700  dark:text-soft-pink-200 font-bold text-3xl mt-2.8 mb-2',
            '[&_span]:text-soft-pink-500 [&_span]:dark:text-maroon-400',
          ])}
        >
          {t.rich('best-selling-title', {
            span1: chunks => <span>{chunks}</span>,
            span2: chunks => <span>{chunks}</span>,
          })}
        </h2>

        {/* Description */}
        <p className='text-base text-zinc-500 leading-tight  '>
          {t.rich('best-selling-description', {
            chunk: () => <br />,
          })}
        </p>
      </div>

      {/* Link */}
      <Link href='#'>
        <Button variant={'primary'}>
          {t('best-selling-link')}
          <ArrowRight
            size={16}
            className={cn(['ms-2.5', locale === 'ar' && '-scale-100'])}
          />
        </Button>
      </Link>
    </>
  );
}
