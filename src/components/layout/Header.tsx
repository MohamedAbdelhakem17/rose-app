'use client';

import { Button } from '@/components/shared';
import { cn } from '@/lib/utils/utils';
import {
  Bell,
  Heart,
  LocationEdit,
  Search,
  ShoppingCart,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface HeaderProps {
  className?: string;
}

import { navigationItems } from '@/lib/data/navigation';

export function Header({ className }: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <header className={cn('bg-white border-b border-zinc-200', className)}>
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
              <div>
                <p className=' font-medium text-base text-zinc-500'>
                  Dliver to :
                </p>
                <span className='flex items-center gap-3 text-maroon-700 text-md font-medium'>
                  <LocationEdit />
                  Cairo
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className='flex-1 max-w-2xl mx-8'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-5 w-5' />
                <input
                  type='text'
                  placeholder='What awesome gift are you looking for?'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-zinc-700 placeholder:text-zinc-400'
                />
              </div>
            </div>

            {/* User Actions */}
            <div className='flex items-center space-x-6'>
              {/* Login */}
              <Link
                href='/login'
                className='flex items-center space-x-2 text-zinc-700 hover:text-maroon-600 transition-colors'
              >
                <User className='h-5 w-5' />
                <span className='text-sm font-medium'>Login</span>
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Wishlist */}
              <Link
                href='/wishlist'
                className='text-zinc-700 hover:text-pink-500 transition-colors'
              >
                <Heart className='h-5 w-5' />
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Cart */}
              <Link
                href='/cart'
                className='text-zinc-700 hover:text-pink-500 transition-colors'
              >
                <ShoppingCart className='h-5 w-5' />
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Notifications */}
              <Link
                href='/notifications'
                className='text-zinc-700 hover:text-pink-500 transition-colors'
              >
                <Bell className='h-5 w-5' />
              </Link>

              {/* Divider */}
              <div className='h-6 w-px bg-zinc-300' />

              {/* Language */}
              <Button
                variant='ghost'
                size='sm'
                className='text-zinc-700 hover:text-maroon-600 p-0 h-auto'
              >
                العربية
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className='bg-maroon-700'>
        <div className='container mx-auto px-4'>
          <nav className='flex items-center justify-center space-x-8 py-3'>
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 text-white hover:text-pink-300 transition-colors py-2 px-3 rounded-md',
                    item.isActive && 'border-b-2 border-soft-pink-200'
                  )}
                >
                  <Icon className='h-5 w-5' />
                  <span className='text-sm font-medium'>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
