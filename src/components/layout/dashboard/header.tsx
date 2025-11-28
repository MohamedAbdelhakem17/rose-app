'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export default function Header() {
  // Translate
  const t = useTranslations();

  // Pathname
  const pathname = usePathname();

  // Query params
  const searchParams = useSearchParams();
  const nameFromQuery = searchParams.get('name');

  // Variables
  // /en/dashboard/products => ["dashboard", "products"]
  const segments = pathname.split('/').filter(Boolean).slice(1);

  const labelMap: Record<string, string> = {
    dashboard: t('dashboard-header-breadcrumb-link-1'),
    overview: t('dashboard-header-breadcrumb-link-2'),
    category: t('dashboard-header-breadcrumb-link-3'),
    occasions: t('dashboard-header-breadcrumb-link-4'),
    products: t('dashboard-header-breadcrumb-link-5'),
  };

  // Function
  function buildHref(index: number) {
    const path = ['/', ...segments.slice(0, index + 1)].join('/');
    return path;
  }

  return (
    <header className='px-4 py-6 border-b border-b-black/10 dark:border-b-white/30'>
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;

            // if last page include name in query
            const label =
              isLast && nameFromQuery
                ? decodeURIComponent(nameFromQuery)
                : (labelMap[segment] ?? segment);

            return (
              <React.Fragment key={segment}>
                {index !== 0 && <BreadcrumbSeparator />}

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={buildHref(index)}
                      className={cn([
                        'capitalize',
                        isLast && 'text-maroon-500',
                      ])}
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
