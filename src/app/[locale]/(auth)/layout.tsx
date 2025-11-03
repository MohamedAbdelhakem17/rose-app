import LanguageToggle from '@/components/shared/language-toggle';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen grid grid-cols-2'>
      <div className='h-full flex flex-col justify-center '>
        <div className='w-[406px] mx-auto'>
          <div className='flex justify-end'>
            {/* language switcher button */}
            <LanguageToggle />
          </div>
          {/* first separator image */}
          <div className='flex justify-center'>
            <Image
              src='/images/auth-separator.webp'
              alt=''
              width={280}
              height={45}
              className='my-10 text-center'
            />
          </div>
          {/* page content */}
          {children}
          {/* second separator image */}
          <div className='flex justify-center'>
            <Image
              src='/images/auth-separator.webp'
              alt=''
              width={280}
              height={45}
              className='my-10 text-center transform rotate-180'
            />
          </div>
        </div>
      </div>
      {/* side image */}
      <div className=' h-full relative'>
        <Image
          src='/images/auth-image.webp'
          fill
          alt=''
          className='object-fill'
        />
      </div>
    </div>
  );
}
