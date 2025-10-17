import React from 'react';
import { Section } from '../../layout';
import SmallSectionHeading from '../../shared/small-section-heading';
import SectionTitle from '../../shared/sedtion-title';
import Image from 'next/image';

export default function Gallery() {
  return (
    <Section>
      <section className='flex flex-col justify-center items-center '>
        {/* small heading above */}
        <SmallSectionHeading heading='Gallery' />
        {/* descritption   */}
        <SectionTitle title='Check Out our Wonderful Gallery' />

        <div className='grid grid-cols-3 gap-4 w-full py-section-xs'>
          {/* First column */}
          <div className='grid grid-rows-3 gap-4'>
            <div className='row-span-2'>
              <Image
                src='/assets/images/gallery/1.png'
                alt=''
                width={800}
                height={800}
                className='object-cover w-full h-full '
              />
            </div>
            <div className='row-span-1'>
              <Image
                src='/assets/images/gallery/2.png'
                alt=''
                width={800}
                height={800}
                className='object-cover w-full h-full '
              />
            </div>
          </div>

          {/* Second column */}
          <div className='grid grid-rows-2 gap-4'>
            <Image
              src='/assets/images/gallery/3.png'
              alt=''
              width={800}
              height={800}
              className='object-cover w-full h-full '
            />
            <Image
              src='/assets/images/gallery/4.png'
              alt=''
              width={800}
              height={800}
              className='object-cover w-full h-full '
            />
          </div>

          {/* Third column */}
          <div className='grid grid-rows-2 gap-4'>
            <Image
              src='/assets/images/gallery/5.png'
              alt=''
              width={800}
              height={800}
              className='object-cover w-full h-full '
            />
            <Image
              src='/assets/images/gallery/6.png'
              alt=''
              width={800}
              height={800}
              className='object-cover w-full h-full '
            />
          </div>
        </div>
      </section>
    </Section>
  );
}
