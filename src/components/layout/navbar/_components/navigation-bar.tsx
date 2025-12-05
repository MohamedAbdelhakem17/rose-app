'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { useNavigationLinks } from '@/lib/constants/navigation';
import { cn } from '@/lib/utils/utils';

export default function NavigationBar() {
  // Navigation
  const pathName = usePathname();

  // Hooks
  const navigationLinks = useNavigationLinks();

  return (
    // Links Container
    <div className='bg-maroon-700 dark:bg-pink-200'>
      {/* Menu  */}
      <div className='container mx-auto px-4'>
        {/* Links items */}
        <nav className='flex items-center justify-center space-x-3 py-1'>
          {navigationLinks.map(item => {
            // Extract icon
            const Icon = item?.icon;

            // Check is Page Active
            const isActive = pathName === item.href;

            return (
              // Navbar link
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 text-white dark:text-zinc-700 hover:text-pink-300 dark:hover:text-maroon-800 transition-colors py-2 px-3 rounded-md',
                  isActive &&
                    'border-b-2 border-soft-pink-200 dark:border-maroon-800 dark:text-maroon-800'
                )}
              >
                {/* Icon */}
                {Icon && <Icon size={18} className='me-2' />}

                {/* Label */}
                <span className='text-sm font-medium'>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
