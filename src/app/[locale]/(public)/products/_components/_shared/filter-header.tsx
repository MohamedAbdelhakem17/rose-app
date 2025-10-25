import { Button } from '@/components/ui/button';
import { FilterHeaderProps } from '@/lib/types/filters';
import { cn } from '@/lib/utils/utils';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ExtendedFilterHeaderProps = FilterHeaderProps & {
  showReset?: boolean; // controls reset button visibility
};

export default function FilterHeader({
  title,
  onReset,
  className = '',
  showReset = false,
}: ExtendedFilterHeaderProps) {
  const t = useTranslations();

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {/* title */}
      <h2 className='font-semibold dark:text-zinc-50 text-zinc-800 text-xl'>
        {title}
      </h2>

      {/* reset button (only shows when showReset is true) */}
      {showReset && (
        <Button
          variant='link'
          className='text-red-600 dark:text-red-500 p-0 h-auto gap-1'
          onClick={onReset}
        >
          <X size={14} />
          {t('reset-filters')}
        </Button>
      )}
    </div>
  );
}
