'use client';

import { FC } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

type AuthRedirectProps = {
  message?: string;
  linkText?: string;
  href: string;
  className?: string;
};

export const AuthRedirect: FC<AuthRedirectProps> = ({
  href,
  className = '',
}) => {
  //Translations
  const t = useTranslations();

  return (
    <div className={`flex justify-center items-center mt-4 ${className}`}>
      <p className='flex gap-2'>
        {t('auth-redirect-message')}
        <span className='text-maroon-700 dark:text-pink-300 font-semibold hover:text-maroon-900 dark:hover:text-pink-500'>
          <Link href={href}>{t('auth-redirect-link')}</Link>
        </span>
      </p>
    </div>
  );
};
