'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
  // Translate
  const t = useTranslations()

  // Pathname
  const pathname = usePathname();

  // Variables
  // /en/dashboard/products => ["dashboard", "products"]
  const segments = pathname.split('/').filter(Boolean).slice(1);
  
  const labelMap: Record<string, string> = {
    dashboard: t("dashboard-header-breadcrumb-link-1"),
    overview: t("dashboard-header-breadcrumb-link-2"),
    category: t("dashboard-header-breadcrumb-link-3"),
    occasions: t("dashboard-header-breadcrumb-link-4"),
    products: t("dashboard-header-breadcrumb-link-5"),
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
          {segments.map((segment, index) => (
            <React.Fragment key={segment}>
              {index !== 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={buildHref(index)} className='capitalize'>
                    {labelMap[segment] ?? segment}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
