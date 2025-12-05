'use client';

import { Input } from '@/components/ui/Input';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function OccasionsSearch({ search }: { search: string }) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Functions
  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', value.trim());
      params.set('page', '1');

      router.replace(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const debouncedUpdate = useMemo(
    () => debounce(updateSearch, 500),
    [updateSearch]
  );

  return (
    <div className='relative w-full py-4 bg-white text-zinc-600'>
      <Search
        className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2'
        strokeWidth={1.5}
      />

      <Input
        type='text'
        placeholder='search'
        defaultValue={search}
        onChange={e => debouncedUpdate(e.target.value)}
        className='w-full pl-9 h-full'
      />
    </div>
  );
}
