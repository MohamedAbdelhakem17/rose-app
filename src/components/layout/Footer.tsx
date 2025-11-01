import { NewsletterForm } from '@/components/shared/newsletter-form';
import { cn } from '@/lib/utils/utils';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

import { navigationLinks } from '@/lib/constants/footer-navigation';

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-zinc-800 dark:bg-zinc-900 text-zinc-100 border-t border-zinc-800',
        className
      )}
    >
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Left Section - Logo and Copyright */}
          <div className='flex items-center gap-4'>
            <div>
              <div>
                <Image
                  src='/assets/logo1.svg'
                  alt='Rose Logo'
                  width={50}
                  height={50}
                  className='object-contain w-60 h-56'
                />
              </div>
              <div className='text-center'>
                <h4 className='text-soft-pink-300 font-semibold text-lg'>
                  Rose E-Commerce App
                </h4>
                <p className='text-zinc-300 text-sm'>
                  All rights reserved | 2025
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='text-lg font-semibold text-soft-pink-300'>
                Discover our website
              </h3>
              <nav className='grid grid-cols-1 gap-2'>
                {navigationLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className='text-zinc-300 hover:text-pink-400 transition-colors text-sm'
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Section - Newsletter Subscription */}
          <div className='space-y-4 text-center'>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
