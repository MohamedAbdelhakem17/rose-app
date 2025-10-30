'use client';

import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type FilterChangeHandler = (
  _page: string,
  _key: string,
  _value: string
) => void;

/**
 * Custom hook to handle search-based filtering and navigation.
 *
 * This hook simplifies updating URL query parameters and navigating
 * between filtered pages (for example, changing category, sort, or price filter).
 *
 * - Keeps existing query parameters unless explicitly changed.
 * - Removes parameters if the value is empty or equals "all".
 * - Resets the `page` parameter to "1" when a non-page filter changes.
 * - Supports smooth navigation by disabling automatic scroll-to-top.
 *
 * @example
 * ```tsx
 * const handleFilterChange = useSearchFilter({ scroll: false });
 * handleFilterChange('/', 'occasions', '673b34c21159920171827ae0');
 * ```
 */
export default function useSearchFilter(options?: {
  scroll?: boolean;
}): FilterChangeHandler {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Variables
  const scroll = options?.scroll ?? false;

  // function
  const handleFilterChange = useCallback(
    (page: string, key: string, value: string) => {
      // Reset all filters
      if (key === 'reset') {
        router.push(`/${page}`, { scroll: scroll });
        return;
      }

      // Clone current search params
      const params = new URLSearchParams(searchParams);

      // Handle filter change
      if (!value || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset page number if not the page filter
      if (key !== 'page') params.delete('page');

      // Navigate with updated params
      router.push(`${page}?${params.toString()}`, { scroll: scroll });
    },
    [router, searchParams, scroll]
  );

  return handleFilterChange;
}
