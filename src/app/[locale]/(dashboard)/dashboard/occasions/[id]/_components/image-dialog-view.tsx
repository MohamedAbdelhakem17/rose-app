import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ImageDialogView({ imageUrl }: { imageUrl: string }) {
  // Translation
  const t = useTranslations();
  return (
    <>
      <Dialog>
        <DialogTrigger className='border border-gray-100 py-2 px-4 rounded-md w-fit ms-auto text-blue-600 flex items-center gap-2'>
          {/* Icon */}
          <ImageIcon />
          {/* Label */}
          {t('view-occasion-image-button-label')}
        </DialogTrigger>

        {/* Dialog content */}
        <DialogContent className='rounded-xl py-12 text-center flex items-centre justify-center border border-gray-100'>
          <Image
            src={imageUrl}
            alt='occasion image'
            width={300}
            height={500}
            priority
            className='rounded-md h-96 w-64'
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
