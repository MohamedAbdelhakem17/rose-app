import { Button } from '@/components/shared';
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
            {' '}
            <Button
              variant='ghost'
              size='sm'
              className='text-zinc-700 hover:text-maroon-600 p-0 h-auto'
            >
              العربية
            </Button>
          </div>
          <div className='flex justify-center'>
            {' '}
            <Image
              src='/images/auth-separator.webp'
              alt=''
              width={280}
              height={45}
              className='my-10 text-center'
            />
          </div>
          {children}
          <div className='flex justify-center'>
            {' '}
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
