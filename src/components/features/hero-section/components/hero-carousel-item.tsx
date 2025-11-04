import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarouselItem({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  const t = useTranslations();
  return (
    <div className='w-full h-[440px] relative'>
      <Image
        alt={title}
        src={image}
        fill
        className='rounded-2xl object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-r from-black/80 to-black/0 rounded-2xl'></div>
      <div className='absolute bottom-9 left-9 w-full max-w-xl'>
        <h3 className='font-semibold text-4xl text-white'>{title}</h3>
        <p className='mb-9 text-white'>{subtitle}</p>
        <div className='mt-4'>
          <Link
            href='#'
            className='flex justify-center items-center bg-maroon-50 text-maroon-700 w-32 p-1 rounded-lg gap-1 h-9 hover:bg-maroon-700 hover:text-white transition-all duration-300 hover:scale-105'
          >
            {t('hero-carousel-button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
