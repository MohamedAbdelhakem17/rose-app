'use client';

import { Link } from '@/i18n/navigation';
import { randomColor } from '@/lib/utils/random-color';
import { cn } from '@/lib/utils/utils';
import { EllipsisVertical, LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

export default function Admin() {
  // Translate
  const t = useTranslations();

  // Session
  const session = useSession();

  // Locale
  const locale = useLocale();

  // State
  const [toggle, setToggle] = useState<boolean>(false);

  // Variables
  const firstName = session.data?.firstName ?? 'A';
  const avatarBg = randomColor(firstName);
  const firstLetter = firstName.charAt(0).toUpperCase();
  const hasImage = session.data?.image && session.data.image !== '';
  const RTL: boolean = locale === 'ar';

  return (
    <div className=' relative flex justify-center items-end gap-5 border-t border-t-black/10 mx-6 mt-80'>
      <div className=' flex justify-center items-end gap-2.5'>
        {/* Avatar */}
        <div className='flex justify-center items-center rounded-full overflow-hidden w-12 h-12'>
          {hasImage ? (
            <Image
              src={session.data?.image === undefined && '/assets/logo1.svg'}
              alt={firstName}
              width={54}
              height={54}
              className='object-cover'
            />
          ) : (
            <div
              className='w-11 h-11 flex justify-center items-center text-white font-bold text-xl rounded-full'
              style={{ backgroundColor: avatarBg }}
            >
              <p>{firstLetter}</p>
            </div>
          )}
        </div>

        {/* Admin Information */}
        <div>
          <h3 className=' font-bold'>{`${session.data?.firstName} ${session.data?.lastName}`}</h3>
          <p className=' font-semibold text-zinc-300 text-xs'>
            {session.data?.email}
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className=' p-1 cursor-pointer' onClick={() => setToggle(!toggle)}>
        <EllipsisVertical size={18} />
      </div>

      {/* Menu Action */}
      {toggle && (
        <div
          className={cn(
            ' absolute bottom-0  w-56 rounded-xl font-inter bg-white dark:bg-zinc-700 border border-zinc-100',
            RTL ? '-left-56' : '-right-56'
          )}
        >
          {/* Header */}
          <h3 className=' capitalize font-semibold text-maroon-600 dark:text-soft-pink-200 pl-4 p-2 border-b-zinc-100 border-b'>
            {`${session.data?.firstName} ${session.data?.lastName}`}
          </h3>

          {/* Buttons */}

          <Link
            href={'/account'}
            className=' flex justify-start items-center gap-2 font-medium capitalize p-2 hover:bg-zinc-200 dark:hover:bg-zinc-500 border-b-zinc-100 border-b'
          >
            <User size={16} />
            {t('dashboard-sidebar-admin-menu-action-link-1')}
          </Link>

          <div
            className=' flex justify-start items-center gap-2 font-medium capitalize p-2 cursor-pointer hover:bg-maroon-300 border-b-zinc-100 border-b rounded-b-xl'
            onClick={() => signOut()}
          >
            <LogOut size={16} />
            <p>{t('dashboard-sidebar-admin-menu-action-link-2')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
