import React from 'react';

export default function SmallSectionHeading({ heading }: { heading: string }) {
  return (
    <h1 className=' text-h-6 tracking-[.5rem] uppercase py-element-md  text-soft-pink-500'>
      {heading}
    </h1>
  );
}
