'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/utils';
import Image from 'next/image';
import { PaymentOptionProps } from '@/lib/types/checkout';

export function PaymentOption({
  title,
  description,
  imageSrc,
  isSelected = false,
  onSelect,
}: PaymentOptionProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'cursor-pointer border rounded-lg  p-6 flex flex-col items-center gap-2 transition-colors shadow-sm ',
        isSelected
          ? 'bg-zinc-200 dark:bg-soft-pink-500'
          : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={180}
        height={180}
        className='object-contain'
      />
      <h3
        className={cn(
          'text-lg font-semibold',
          isSelected
            ? 'text-maroon-600 dark:text-soft-pink-500'
            : 'text-gray-800 dark:text-gray-100'
        )}
      >
        {title}
      </h3>
      <p className='text-sm text-center text-gray-500 dark:text-gray-300'>
        {description}
      </p>
    </div>
  );
}
