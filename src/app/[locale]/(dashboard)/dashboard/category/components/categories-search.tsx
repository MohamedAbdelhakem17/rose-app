import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

interface CategoriesSearchProps {
  initialSearch: string;
  onSearchChange: (query: string) => void;
}

export default function CategoriesSearch({
  initialSearch,
  onSearchChange,
}: CategoriesSearchProps) {
  const t = useTranslations();

  return (
    <div className='px-6 pt-4 pb-2'>
      <div className='relative w-full'>
        <Search
          className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400'
          strokeWidth={1.5}
        />
        <Input
          type='text'
          placeholder={t('category-search-placeholder')}
          defaultValue={initialSearch}
          onChange={event => onSearchChange(event.target.value)}
          className='w-full bg-zinc-50 pl-9'
        />
      </div>
    </div>
  );
}
