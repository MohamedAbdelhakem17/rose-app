'use client';

import { cn } from '@/lib/utils/utils';
import { Heart, LocationEdit, Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Theme from '../shared/theme';
import LanguageToggle from '../shared/language-toggle';
import AddressModel from '../features/address-modal/address-model';
import Notifications from './navbar/_components/user-notifications';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  // State
  const [searchQuery, setSearchQuery] = React.useState('');

  const pathName = usePathname();

  // Locale
  const locale = useLocale();

  // Translate
  const t = useTranslations();

  return (
    <header
      className={cn(
        'bg-white border-b border-zinc-200 dark:bg-zinc-800 dark:text-white',
        className
      )}
    >
      {/* Top Header Section */}
      <div className='border-b border-zinc-100'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            {/* Logo Section */}
            <div className='flex items-center space-x-3'>
              <div className='relative'>
                <Image
                  src='/assets/logo1.svg'
                  alt='Rose Logo'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
              {/* User location */}
              <div>
                <p className=' font-medium text-base text-zinc-500'>
                  {t('home-address')}
                </p>
                <AddressModel>
                  <span className='flex items-center gap-3 text-maroon-700 dark:text-soft-pink-200 text-md font-medium'>
                    <LocationEdit />
                    Cairo
                  </span>
                </AddressModel>
              </div>
            </div>

            {/* Search Bar */}
            <div className='flex-1 max-w-2xl mx-8'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-white h-5 w-5' />
                <input
                  type='text'
                  placeholder={t('search-placeholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-zinc-700 dark:text-white placeholder:text-zinc-400'
                />
              </div>
            </div>

            {/* User Actions */}
            <div className='flex items-center space-x-6 text-zinc-700 dark:text-white'>
              {/* Login */}
              <Link
                href='/login'
                className='flex items-center space-x-2  hover:text-maroon-600 transition-colors'
              >
                <User className='h-5 w-5' />
                <span className='text-sm font-medium'>{t('login-header')}</span>
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Wishlist */}
              <Link
                href='/wishlist'
                className=' hover:text-pink-500 transition-colors'
              >
                <Heart className='h-5 w-5' />
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Cart */}
              <Link
                href='/cart'
                className=' hover:text-pink-500 transition-colors'
              >
                <ShoppingCart className='h-5 w-5' />
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Notifications */}
              <Notifications />

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Language */}
              <LanguageToggle />

              {/* Theme */}
              <Theme />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className='bg-maroon-700 dark:bg-soft-pink-200 '>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center justify-center space-x-8 py-3'>
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = pathName === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 text-white dark:text-zinc-800 hover:text-pink-300 transition-colors py-2 px-3 rounded-md ',
                    isActive &&
                      'border-b-2  border-soft-pink-200 dark:border-maroon-700 dark:text-maroon-700'
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <span className='text-sm font-medium'>
                    {locale === 'en' ? item.name : item.ar}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
