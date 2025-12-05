'use client';

import { Link } from '@/i18n/navigation';
import { Loader2Icon, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import ProfileMenu from './profile-menu';

export default function UserProfile() {
  const t = useTranslations();
  const { data: session, status } = useSession();

  const isAuth = status === 'authenticated';
  const isPending = status === 'loading';

  if (isPending) {
    return <Loader2Icon className='animate-spin h-8 w-8 me-1' />;
  }

  return (
    <>
      {isAuth ? (
        <ProfileMenu session={session} />
      ) : (
        <Link
          href='/login'
          className='flex items-center space-x-2 text-zinc-700 dark:text-white hover:text-maroon-600 transition-colors'
        >
          <User className='h-5 w-5 me-1' />
          <span className='text-sm font-medium'>{t('login')}</span>
        </Link>
      )}
    </>
  );
}
