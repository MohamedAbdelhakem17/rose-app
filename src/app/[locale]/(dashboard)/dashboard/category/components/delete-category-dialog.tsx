import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteCategoryDialog({
  isOpen,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteCategoryDialogProps) {
  const t = useTranslations();

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
              <Trash2 className='h-6 w-6 text-gray-600' />
            </div>
            <DialogTitle className='text-center text-xl font-semibold'>
              {t('category-delete-title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogFooter className='flex gap-3 sm:justify-center'>
          <Button
            variant='secondary-outline'
            onClick={onCancel}
            className='flex-1'
          >
            {t('category-delete-cancel')}
          </Button>
          <Button
            variant='destructive'
            onClick={onConfirm}
            disabled={isDeleting}
            loading={isDeleting}
            loadingText={t('category-delete-loading')}
            className='flex-1'
          >
            {t('category-delete-confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
