'use client';

import ToggleLanguage from '@/components/shared/toggle-language';
import ToggleTheme from '@/components/shared/toggle-theme';

// import UserProfile from '';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import Notifications from './user-notifications';

const UserProfile = dynamic(
  () => import('@/components/layout/navbar/_components/user-profile'),
  { ssr: true }
);

export default function NavActions() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const navLinks = [
    {
      href: '/wishlist',
      label: 'Wishlist',
      icon: Heart,
      hoverColor: 'hover:text-pink-500',
    },
    {
      href: '/cart',
      label: 'Cart',
      icon: ShoppingCart,
      hoverColor: 'hover:text-pink-500',
    },
  ];

  return (
    <div
      className={cn([
        'flex items-center divide-x divide-zinc-300 [&>*]:px-2 [&>*]:mx-1',
        isRTL && 'divide-x-reverse',
      ])}
    >
      {/* User profile and login action */}
      <UserProfile />

      {/* Other Links */}
      {navLinks.map(({ href, label, icon: Icon, hoverColor }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center space-x-2 text-zinc-700 dark:text-white ${hoverColor} transition-colors`}
        >
          <Icon className='h-5 w-5 me-1' />
          <span className='sr-only'> {label}</span>
        </Link>
      ))}

      {/* Notifications */}
      <Notifications />

      {/* Toggle Language */}
      <ToggleLanguage />

      {/* Select Theme */}
      <ToggleTheme />
    </div>
  );
}
