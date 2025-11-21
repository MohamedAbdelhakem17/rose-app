'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/navigation';
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MapPinHouse,
  ScrollText,
  Settings,
  User,
} from 'lucide-react';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface ProfileMenuProps {
  session: Session | null;
}

export default function ProfileMenu({ session }: ProfileMenuProps) {
  // Translation
  const t = useTranslations();

  // Function
  const handleSignOut = () => signOut();

  // Variables
  const menuItems = [
    { icon: <User />, label: t('profile-menu.profile'), href: '/profile' },
    {
      icon: <MapPinHouse />,
      label: t('profile-menu.addresses'),
      href: '/addresses',
    },
    { icon: <ScrollText />, label: t('profile-menu.orders'), href: '/orders' },
    {
      icon: <LayoutDashboard />,
      label: t('profile-menu.dashboard'),
      href: '/dashboard',
    },
  ];

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          className='flex items-center gap-2 text-zinc-700 dark:text-white hover:text-maroon-600 transition-colors outline-none border-none'
        >
          <div className='flex flex-col items-start text-left'>
            {t.rich('hello-user', {
              title: chunks => (
                <span className='text-sm font-medium text-zinc-500 dark:text-white'>
                  {chunks}
                </span>
              ),
              name: chunks => (
                <span className='flex items-center gap-2 text-maroon-700 dark:text-pink-200 text-base font-semibold'>
                  {chunks}
                  <ChevronDown className='h-4 w-4' />
                </span>
              ),
              username: session?.firstName || 'Guest',
            })}
          </div>
        </button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent
        className='p-2 rounded-md w-56'
        align='start'
        sideOffset={8}
      >
        {/* User Info */}
        <DropdownMenuItem className='text-maroon-700 font-inter font-semibold text-sm py-3 cursor-default'>
          {session?.firstName} {session?.lastName}
        </DropdownMenuItem>

        {/* Separator  */}
        <DropdownMenuSeparator />

        {/* Dynamic Menu Links */}
        {menuItems.map(item => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className='flex items-center gap-2 hover:text-maroon-700 transition-colors'
            >
              {/* Icon */}
              {item.icon}

              {/* Label */}
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        {/* Separator  */}
        <DropdownMenuSeparator />

        {/* Dashboard */}
        <DropdownMenuItem asChild>
          <Link
            href='/dashboard'
            className='flex items-center gap-2 hover:text-maroon-700 transition-colors'
          >
            {/* Icon */}
            <Settings />

            {/* Label */}
            {t('profile-menu.dashboard')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className='flex items-center gap-2 hover:text-maroon-700 transition-colors'
        >
          {/* Icon */}
          <LogOut />

          {/* Label */}
          {t('profile-menu.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
