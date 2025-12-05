'use client';

import { Input } from '@/components/shared';
import { cn } from '@/lib/utils/utils';
import { LocationEdit, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import NavActions from './_components/navigation-actions';
import NavigationBar from './_components/navigation-bar';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // Translation
  const t = useTranslations();
  // State
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <header
      className={cn(
        'bg-white border-b border-zinc-200 dark:bg-zinc-800',
        className
      )}
    >
      {/* Top Header Section */}
      <div className='border-b border-zinc-100'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo Section */}
            <div className='flex items-center gap-x-3'>
              {/* Logo */}
              <Image
                src='/assets/logo1.svg'
                alt='Rose Logo'
                width={50}
                height={50}
                className='object-contain p-.5'
              />

              {/* Deliver to */}
              <div className='flex flex-col'>
                {t.rich('deliver-to', {
                  // Label
                  title: chunks => (
                    <span className='text-sm font-medium text-zinc-500 dark:text-white'>
                      {chunks}
                    </span>
                  ),
                  // City with icon
                  address: chunks => (
                    <span className='flex items-center gap-2 text-maroon-700 dark:text-pink-200 text-base font-semibold'>
                      <LocationEdit className='h-5 w-5' />
                      {chunks}
                    </span>
                  ),
                  city: 'Cairo',
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className='flex-1 max-w-2xl mx-8'>
              <div className='relative'>
                <Search className='absolute start-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5' />
                <Input
                  type='text'
                  placeholder={t('search-placeholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full ps-10 pl-4 '
                />
              </div>
            </div>

            {/* User Actions */}
            <NavActions />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <NavigationBar />
    </header>
  );
}
