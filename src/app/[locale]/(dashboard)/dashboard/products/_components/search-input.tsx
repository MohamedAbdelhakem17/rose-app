'use client';

import { Input } from '@/components/shared/Input';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set('search', value);
    else params.delete('search');

    router.replace('?' + params.toString(), { scroll: false });
  };
  return (
    <div className='mt-0.5 relative w-full '>
      <Search
        size={18}
        className='absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400'
      />
      <Input
        className='rounded-md w-full ps-10 py-5 focus:ring-zinc-50 focus:border-none  '
        value={search}
        onChange={e => updateQuery(e.target.value)}
      />
    </div>
  );
}
