import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}

export default function CategoriesHeader({
  onAddCategory,
}: CategoriesHeaderProps) {
  const t = useTranslations();

  return (
    <div className='flex items-center justify-between px-6 pt-6'>
      <h1 className='text-lg font-semibold text-zinc-900'>
        {t('category-all-categories')}
      </h1>

      <Button
        variant='primary'
        size='lg'
        className='rounded-full px-6'
        onClick={onAddCategory}
      >
        {t('category-add-new')}
      </Button>
    </div>
  );
}
