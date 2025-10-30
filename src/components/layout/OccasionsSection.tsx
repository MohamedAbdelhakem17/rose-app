import Image from 'next/image';
import React from 'react';

export default function OccasionsSection() {
  return (
    <section className='flex justify-center items-center gap-6'>
      <OccasionCard />
      <OccasionCard />
      <OccasionCard />
    </section>
  );
}

function OccasionCard() {
  return (
    <div className=' w-full h-[271px] rounded-2xl relative '>
      <Image alt='' src='/images/Wedding.webp' fill className='rounded-2xl' />
      <div className='textContainer absolute m-6 bottom-0 flex flex-col gap-2.5'>
        <span className='py-0.5 px-2.5 bg-maroon-50 text-maroon-600 w-16 font-medium text-xs flex justify-center items-center rounded-lg'>
          Wedding
        </span>
        <h3 className='font-semibold text-2xl text-white '>
          Celebrate Her Forever with a Gift She’ll Always Remember
        </h3>
      </div>
    </div>
  );
}
