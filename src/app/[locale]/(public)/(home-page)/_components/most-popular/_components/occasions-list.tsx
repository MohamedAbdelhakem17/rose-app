'use client';

import { Button } from '@/components/ui/button';
import useSearchFilter from '@/hooks/use-search-filter';
import { cn } from '@/lib/utils/utils';
import { useSearchParams } from 'next/navigation';

export default function OccasionsList({
  occasions,
}: {
  occasions: OccasionsType[];
}) {
  // Navigation
  const searchParams = useSearchParams();

  // Hooks
  const handleSearchFilter = useSearchFilter({ scroll: false });

  return (
    // Occasions filter container
    <div className='flex items-center justify-end gap-6'>
      {occasions?.map((occasion: OccasionsType) => (
        // Occasion Button
        <Button
          key={occasion._id}
          variant='link'
          className={cn([
            'no-underline hover:text-maroon-500 p-0 hover:no-underline',
            occasion._id === searchParams.get('occasion') && 'text-maroon-600',
          ])}
          onClick={() => handleSearchFilter('/', 'occasion', occasion._id)}
        >
          {occasion.name}
        </Button>
      ))}
    </div>
  );
}
