'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useRouter } from '@/i18n/navigation';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import useDeleteOccasion from './../_hooks/use-delete-occasion copy';

export default function DeleteOccasions({
  occasionId,
}: {
  occasionId: string;
}) {
  // Translation
  const t = useTranslations();

  //Navigation
  const router = useRouter();

  // State
  const [open, setOpen] = useState(false);

  // Mutation
  const { deleteOccasion, isPending } = useDeleteOccasion();

  const handleDelete = () => {
    deleteOccasion(occasionId, {
      onSuccess: () => {
        toast.success(t('occasion-deleted-successfully'));

        setOpen(false);
        router.refresh();
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.message || t('something-went-wrong'));
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='destructive-outline'
          size='sm'
          className='flex items-center gap-2'
        >
          <Trash2 className='h-4 w-4' />
          {t('delete')}
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className='rounded-xl p-6 text-center'>
        <div className='py-12'>
          {/* Trash icon in circle */}
          <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
            <Trash2 className='h-16 p-3 rounded-full w-16 text-gray-700 bg-gray-200 text-xs' />
          </div>

          {/* Title */}
          <DialogTitle className='text-lg font-semibold'>
            {t('are-you-sure-you-want-to-delete-this-occasions')}
          </DialogTitle>
        </div>

        <DialogFooter className='mt-6 flex justify-center gap-4'>
          {/* Cancel Deleting */}
          <DialogClose asChild>
            <Button variant='secondary-outline' className='flex-1'>
              {t('cancel')}
            </Button>
          </DialogClose>

          {/* Confirm Deleting */}
          <Button
            variant='primary'
            className='flex-1'
            onClick={handleDelete}
            disabled={isPending}
            loadingText={t('deleting')}
          >
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
