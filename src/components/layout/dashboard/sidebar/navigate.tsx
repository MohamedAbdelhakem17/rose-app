'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { NAVIGATE_LINKS } from '../constants/navigate-links.constant';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils/utils';

export default function Navigate() {
  // Pathname
  const pathname = usePathname();

  // Locale
  const locale = useLocale();

  // Variables
  const Lang = locale === 'ar' ? 'ar' : 'label';
  return (
    <div className=' flex flex-col gap-4 font-bold w-full'>
      {NAVIGATE_LINKS.map(link => (
        <Link
          href={link.hrf}
          key={link.hrf}
          className={cn(
            ' capitalize flex gap-2.5 p-2.5 w-full',
            pathname === link.hrf &&
              ' bg-maroon-50 text-maroon-600 rounded-xl w-full'
          )}
        >
          <link.icon
            className={cn(pathname === `/${link.hrf}` && 'text-Maroon-600')}
            size={25}
          />
          {link[Lang]}
        </Link>
      ))}
    </div>
  );
}
