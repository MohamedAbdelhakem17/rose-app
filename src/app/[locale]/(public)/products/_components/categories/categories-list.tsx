'use client';

import { Card } from '@/components/ui/card';
import useSearchFilter from '@/hooks/use-search-filter';
import { Category } from '@/lib/types/filters';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import FilterHeader from '../_shared/filter-header';

type Props = {
  categories: Category[];
};

export default function CategoriesList({ categories }: Props) {
  // Translations
  const t = useTranslations();

  // Hooks
  const searchParams = useSearchParams();
  const searchFilter = useSearchFilter();

  // Constants
  const categoryParam = searchParams.get('category');
  const selected = categoryParam || null;

  return (
    <section className='space-y-3'>
      {/* Header with conditional reset */}
      <FilterHeader
        title={t('categories-title')}
        className='w-full'
        onReset={() => searchFilter('products', 'category', '')}
        showReset={!!categoryParam}
      />

      {/* Categories list */}
      <div className='space-y-1 max-h-64 overflow-y-auto custom-scrollbar'>
        {categories.map(({ _id, name, image }) => {
          const isSelected = selected === _id;

          return (
            <Card
              key={_id}
              onClick={() => searchFilter('products', 'category', _id)}
              className={`flex items-center rounded gap-2 overflow-hidden cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-maroon-50 dark:bg-soft-pink-100'
                  : 'hover:bg-muted dark:bg-zinc-700'
              }`}
            >
              <div
                className={`relative w-8 h-8 p-1 ${
                  isSelected
                    ? 'bg-maroon-600 dark:bg-soft-pink-300'
                    : 'bg-zinc-500'
                }`}
              >
                <Image
                  alt={name}
                  src={image}
                  fill
                  className={`object-cover p-1 ${
                    isSelected
                      ? 'filter brightness-0 invert'
                      : 'filter brightness-0 invert opacity-70'
                  }`}
                />
              </div>

              <span
                className={isSelected ? 'text-destructive font-medium' : ''}
              >
                {name}
              </span>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
