'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Flower } from 'lucide-react';
import Navigate from './navigate';
import { Link } from '@/i18n/navigation';
import Admin from './admin';
import { useTranslations } from 'next-intl';
import { SessionProvider } from 'next-auth/react';

export default function Sidebar() {
  // Translate
  const t = useTranslations();
  return (
    <aside className='fixed flex flex-col justify-start bg-white dark:bg-zinc-700 border-r w-80 border-r-black/10 dark:border-r-white/20 p-6 h-screen'>
      <div className=' flex flex-col items-baseline  gap-6 px-8'>
        {/* Logo */}
        <div className='flex justify-center items-center w-full'>
          <Image
            src='/assets/logo1.svg'
            alt={t('dashboard-sidebar-image-alt')}
            width={120}
            height={112}
            className='object-cover'
            loading='lazy'
          />
        </div>

        {/* Preview */}
        <Link href={'/'} className=' w-full font-inter'>
          <Button className=' gap-2 w-full'>
            <Flower />
            {t('dashboard-sidebar-button-preview')}
          </Button>
        </Link>

        {/* Links */}
        <Navigate />
      </div>

      {/* Admin */}
      <SessionProvider>
        <Admin />
      </SessionProvider>
    </aside>
  );
}
