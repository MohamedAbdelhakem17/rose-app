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
 * - Uses `useCallback` for stable reference and performance.
 *
 * @example
 * ```tsx
 * const handleFilterChange = useSearchFilter();
 *
 * // Example: Update the "category" filter and navigate to page 1
 * handleFilterChange('products', 'category', 'electronics');
 * ```
 *
 * @returns {FilterChangeHandler} A memoized function that updates URL filters and navigates accordingly.
 */
export default function useSearchFilter(): FilterChangeHandler {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function
  const handleFilterChange = useCallback(
    (page: string, key: string, value: string) => {
      // Clear all Filters
      if (key === 'reset') {
        router.push(`/${page}`);
        return;
      }

      // Create a copy of current search params
      const params = new URLSearchParams(searchParams);

      // Handle filter update
      if (!value || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      // Reset page number when filter changes
      if (key !== 'page') params.delete('page');

      // Navigate to the new URL
      router.push(`${page}?${params.toString()}`);
    },
    [router, searchParams]
  );

  return handleFilterChange;
}
