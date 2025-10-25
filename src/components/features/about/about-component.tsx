import React from 'react';
import Image from 'next/image';
import { Section } from '../../layout/Section';

import Highlight from '../../shared/highlight';
import { ArrowRight, Check } from 'lucide-react';
import SmallSectionHeading from '../../shared/small-section-heading';
import { cn } from '../../../lib/utils/utils';
import { Button } from '@/components/ui/button';

export default function About() {
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
                'before:rounded-ss-[50px] before:rounded-es-[150px] before:rounded-e-[50px]',
                'before:rounded-se-[200px] before:rounded-ee-[150px]',
                'before:-start-4 before:-top-4 before:-skew-x-3 before:-z-10'
              )}
            >
              {' '}
              <Image
                src='/assets/images/about/gift-img.png'
                alt='Rose Logo'
                width={400}
                height={400}
                className='relative  h-96 object-cover  object-bottom rounded-tl-[60px] rounded-tr-[140px] rounded-br-[130px] rounded-bl-[130px] '
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
            <SmallSectionHeading heading='About' />
            {/* Main Text */}
            <h2 className='text-maroon-700 text-h-3 dark:text-soft-pink-200'>
              Delivering the
              <Highlight>Finest</Highlight>
              Gift Boxes for Your
              <Highlight>Special</Highlight>
              Moments
            </h2>
            {/* Description */}
            <p className='text-p-2 py-element-xs text-zinc-500 leading-tight  '>
              <span className='capitalize'>make</span> every moment memorable
              with our premium gift boxes.
              <span className='capitalize'>carefully</span> curated and
              beautifully packaged, each box is filled with handpicked items
              designed to impress.
              <span className='capitalize'>whether</span> it&apos;s for a
              birthday, wedding, or a simple “thank you,” our gift boxes are
              crafted to leave a lasting impression — because thoughtful gifting
              starts here.
            </p>

            <Button className='my-element-md flex gap-element-xs items-center justify-center'>
              Discover <ArrowRight size={16} />
            </Button>

            {/* features of the about section */}
            <ul className='grid grid-cols-2 text-p-3  gap-y-element-md gap-x-element-lg'>
              <li className='flex items-center gap-element-sm  '>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                Competetive Prices and Easy Shopping
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                Premium Quality & Elegant Packaging
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                Perfect for Every Occasion
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check
                  className='text-maroon-700 dark:text-soft-pink-400'
                  size={16}
                />
                Fast & Reliable Delivery
              </li>
            </ul>
          </div>
        </section>
      </Section>
    </main>
  );
}
