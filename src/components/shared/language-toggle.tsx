'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Button } from '../ui/button';

export default function LanguageToggle() {
  // Pathname
  const pathName = usePathname();

  // Router
  const router = useRouter();

  // Locale
  const locale = useLocale();

  // Functions
  function changeLocale(newLocale: string) {
    router.push(pathName, { locale: newLocale });
  }
  if (locale === 'en') {
    return (
      <Button
        variant='ghost'
        size='sm'
        className='dark:text-white dark:hover:bg-zinc-500 hover:text-maroon-600 p-1 h-auto font-tajawal'
        onClick={() => changeLocale('ar')}
      >
        العربية
      </Button>
    );
  } else {
    return (
      <Button
        variant='ghost'
        size='sm'
        className='dark:text-white dark:hover:bg-zinc-500 hover:text-maroon-600 p-1 h-auto'
        onClick={() => changeLocale('en')}
      >
        English
      </Button>
    );
  }
}
