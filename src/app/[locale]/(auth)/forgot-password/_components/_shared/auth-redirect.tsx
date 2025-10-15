'use client';
import { FC, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';

type AuthRedirectProps = {
  message?: string;
  linkText?: string;
  href: string;
  className?: string;
};

export const AuthRedirect: FC<AuthRedirectProps> = ({
  message = "Don't have an account yet?",
  linkText = 'create one now!',
  href,
  className = '',
}) => {
  return (
    <div className={`flex justify-center items-center mt-4 ${className}`}>
      <p className='flex gap-2'>
        {message}
        <span className='text-maroon-700 dark:text-pink-300 font-semibold hover:text-maroon-900 dark:hover:text-pink-500'>
          <Link href={href}>{linkText}</Link>
        </span>
      </p>
    </div>
  );
};
