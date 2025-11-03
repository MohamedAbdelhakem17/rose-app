import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function SpecialGift() {
  //Locale
  const locale = await getLocale();

  // Translate
  const t = await getTranslations();

  const isRTL: boolean = locale === 'ar';
  return (
    <div className=' mb-6 w-[301px] h-full relative'>
      <Image
        alt=''
        src='/images/specialGift.webp'
        fill
        className='rounded-2xl'
      />
      <div className='absolute bottom-6 left-6 rounded-lg  '>
        <span className='bg-maroon-50 w-36 text-maroon-600 font-medium text-xs px-2 py-0.5 rounded-2xl'>
          Staring from 10.99 EGP
        </span>
        <p className='pb-6 font-semibold text-2xl text-white mt-2.5'>
          Special Gifts For The People You Love
        </p>
        <Link
          href=''
          className='flex justify-center items-center bg-maroon-50 text-maroon-700 w-32 p-0.5 rounded-lg gap-1 h-9 mt-2.5
          hover:bg-maroon-700 hover:text-white transition-all duration-300 hover:scale-105 '
        >
          {t('special-gift-button')}
          {isRTL ? (
            <ArrowLeft size={16} className='ms-0.5 pt-0.5' />
          ) : (
            <ArrowRight size={16} className='ms-0.5 pt-0.5' />
          )}
        </Link>
      </div>
    </div>
  );
}
