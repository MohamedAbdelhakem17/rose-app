import React from 'react';
import Image from 'next/image';
import { Section } from '../layout/Section';
import { Button } from '../shared/Button';
import Highlight from './components/highlight';
import { ArrowRight, Check } from 'lucide-react';

export default function About() {
  return (
    <main>
      <Section>
        <section className='grid grid-cols-2 md:grid-cols-2 '>
          {/* Left: Images */}

          <div className='grid grid-cols-2 '>
            {/* Big image */}
            <div className="relative flex justify-center items-center before:content-[''] before:absolute before:w-[90%] before:h-[105%] before:bg-transparent before:border-4 before:border-maroon-600 before:rounded-ss-[30px] before:rounded-es-[100px] before:rounded-e-[50px] before:rounded-se-[200px] before:rounded-ee-[150px] before:-start-4 before:-top-4 before:-skew-x-3 before:-z-10">
              <Image
                src='/assets/images/about/gift-img.svg'
                alt='Rose Logo'
                width={400}
                height={400}
                className='relative rounded-[40px]'
              />
            </div>
            {/* Two stacked smaller images */}
            <div className='flex flex-col justify-center items-center gap-element-md'>
              {/* sweets image */}
              <Image
                src='/assets/images/about/sweets-img.svg'
                alt='Rose Logo'
                width={185}
                height={185}
              />
              {/* gift with balloons image */}
              <Image
                src='/assets/images/about/gift-with-balloons-img.svg'
                alt='Rose Logo'
                width={185}
                height={185}
              />
            </div>
          </div>

          {/* Right: Text/Content */}
          <div className='flex flex-col justify-center items-start '>
            {/* Heading */}
            <h1 className=' text-h-6 tracking-widest uppercase py-element-lg  text-soft-pink-500'>
              About
            </h1>
            {/* Main Text */}
            <h2 className='text-maroon-700 text-h-3'>
              Delivering the
              <Highlight>Finest</Highlight>
              Gift Boxes for Your
              <Highlight>Special</Highlight>
              Moments
            </h2>

            <p className='text-p-2 py-element-xs text-zinc-500 leading-none '>
              Make every moment memorable with our premium gift boxes. Carefully
              curated and beautifully packaged, each box is filled with
              handpicked items designed to impress. Whether it's for a birthday,
              wedding, or a simple “thank you,” our gift boxes are crafted to
              leave a lasting impression — because thoughtful gifting starts
              here.
            </p>

            <Button className='my-element-md flex gap-element-xs items-center justify-center'>
              Discover <ArrowRight size={16} />
            </Button>

            {/* features of the about section */}
            <ul className='grid grid-cols-2 text-p-3  gap-y-element-md gap-x-element-lg'>
              <li className='flex items-center gap-element-sm  '>
                <Check className='text-maroon-700' size={16} /> Competetive
                Prices and Easy Shopping
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check className='text-maroon-700' size={16} /> Premium Quality
                & Elegant Packaging
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check className='text-maroon-700' size={16} /> Perfect for
                Every Occasion
              </li>
              <li className='flex items-center gap-element-sm'>
                <Check className='text-maroon-700' size={16} /> Fast & Reliable
                Delivery
              </li>
            </ul>
          </div>
        </section>
      </Section>
    </main>
  );
}
