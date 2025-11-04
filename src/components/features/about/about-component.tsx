import React from 'react';
import Image from 'next/image';
import { Section } from '../../layout/Section';
import Highlight from '../../shared/highlight';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import SmallSectionHeading from '../../shared/small-section-heading';
import { cn } from '../../../lib/utils/utils';
import { Button } from '@/components/ui/button';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function About() {
  // Locale
  const locale = await getLocale();

  // Variables
  const isRTL: boolean = locale === 'ar';

  // Translate
  const t = await getTranslations();
  return (
    <main>
      <Section>
        <section className='grid grid-cols-2 md:grid-cols-2 '>
          {/* Left: Images */}

          <div className='grid grid-cols-2 '>
            {/* Big image */}
            <div
              className={cn(
                "relative flex justify-center items-center before:content-[''] before:absolute",
                'before:w-[105%] before:h-[105%] before:bg-transparent before:border-4 before:border-maroon-600 dark:before:border-soft-pink-400',
                isRTL
                  ? 'before:rounded-ss-[200px] before:rounded-es-[150px] before:rounded-e-[50px] before:rounded-se-[50px] before:rounded-ee-[150px]'
                  : 'before:rounded-ss-[50px] before:rounded-es-[150px] before:rounded-e-[50px] before:rounded-se-[200px] before:rounded-ee-[150px]',
                'before:-start-4 before:-top-4 before:-skew-x-3 before:-z-10'
              )}
            >
              {' '}
              <Image
                src='/assets/images/about/gift-img.png'
                alt='Rose Logo'
                width={400}
                height={400}
                className='relative h-96 object-cover object-bottom rounded-tl-[60px] rounded-tr-[140px] rounded-br-[130px] rounded-bl-[130px] '
              />
            </div>
            {/* Two stacked smaller images */}
            <div className='flex flex-col justify-center items-center gap-element-md'>
              {/* sweets image */}
              <Image
                src='/assets/images/about/sweets-img.png'
                alt='Rose Logo'
                width={180}
                height={180}
                className='rounded-full w-52 h-52 object-cover object-center'
              />
              {/* gift with balloons image */}
              <Image
                src='/assets/images/about/gift-with-balloons-img.png'
                alt='Rose Logo'
                width={140}
                height={140}
                className='relative  h-40 w-52 object-cover  object-bottom rounded-tl-[80px] rounded-tr-[170px] rounded-br-[140px] rounded-bl-[100px] '
              />
            </div>
          </div>

          {/* Right: Text/Content */}
          <div className='flex flex-col justify-center items-start '>
            {/* Heading */}
            <SmallSectionHeading heading={t('about-section-title')} />
            {/* Main Text */}
            <h2 className='text-maroon-700 text-h-3 dark:text-soft-pink-200'>
              {t.rich('about-header', {
                highlight1: chunks => <Highlight>{chunks}</Highlight>,
                highlight2: chunks => <Highlight>{chunks}</Highlight>,
              })}
            </h2>
            {/* Description */}
            <p className='text-p-2 py-element-xs text-zinc-500 leading-tight  '>
              {t.rich('about-description', {
                span1: chunks => <span className='capitalize'>{chunks}</span>,
                span2: chunks => <span className='capitalize'>{chunks}</span>,
                span3: chunks => <span className='capitalize'>{chunks}</span>,
              })}
            </p>

            <Button className='my-element-md flex gap-element-xs items-center justify-center'>
              {t('about-button')}
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Button>

            {/* features of the about section */}
            <ul className='grid grid-cols-2 text-p-3  gap-y-element-md gap-x-element-lg'>
              <li className='flex items-center gap-element-sm  '>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                {t('about-check-1')}
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                {t('about-check-2')}
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                {t('about-check-3')}
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                {t('about-check-4')}
              </li>
            </ul>
          </div>
        </section>
      </Section>
    </main>
  );
}
