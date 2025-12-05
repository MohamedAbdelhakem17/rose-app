'use client';

import { Card } from '@/components/ui/card';
import useSearchFilter from '@/hooks/use-search-filter';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import FilterHeader from '../_shared/filter-header';

type Props = {
  occasions: OccasionsType[];
};

export default function OccasionsList({ occasions }: Props) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const searchFilter = useSearchFilter();

  const occasionParam = searchParams.get('occasion');
  const selected = occasionParam || null;

  return (
    <section className='space-y-3'>
      {/* Header with reset */}
      <FilterHeader
        title={t('occasions-title')}
        className='w-full'
        onReset={() => searchFilter('products', 'occasion', '')}
        showReset={!!occasionParam}
      />

      {/* Occasions list */}
      <div className='grid grid-cols-2 gap-2 max-h-80 overflow-y-auto custom-scrollbar'>
        {occasions.map(({ _id, name, image }) => {
          const isSelected = selected === _id;
          return (
            <Card
              key={_id}
              onClick={() => searchFilter('products', 'occasion', _id)}
              className='relative h-24 rounded-xl overflow-hidden cursor-pointer group transition-transform '
            >
              {/* Background Image */}
              <Image
                alt={name}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${image}`}
                fill
                className='object-cover'
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  isSelected
                    ? 'bg-maroon-600/60'
                    : 'bg-black/40 group-hover:bg-black/50'
                }`}
              />

              {/* Title */}
              <span className='absolute inset-0 flex items-center justify-center text-white font-medium text-sm'>
                {name}
              </span>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
