'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/utils';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function ToggleLanguage({ className }: { className?: string }) {
  // Translation
  const locale = useLocale();

  // Navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const query = Object.fromEntries(searchParams.entries());
  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link
      href={{ pathname, query }}
      locale={nextLocale}
      className={cn([
        'text-zinc-700 hover:text-maroon-600 p-0 h-auto dark:text-white',
        className,
      ])}
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </Link>
  );
}
