'use client';

import * as React from 'react';
import { Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils/utils'; // import cn from shadcn
import { ShippingAddressProps } from '@/lib/types/checkout';

export default function ShippingAddress({
  address,
  isSelected = false,
  onSelect,
}: ShippingAddressProps) {
  return (
    <>
      <Card
        onClick={() => onSelect?.(address._id)}
        className={cn(
          'w-full shadow-sm border rounded-2xl cursor-pointer transition-colors',
          isSelected
            ? 'bg-maroon-600 text-white border-maroon-600'
            : 'bg-white text-gray-800'
        )}
      >
        <CardContent className='flex flex-col gap-1 p-4'>
          <div className='flex justify-between items-center'>
            <h2
              className={cn(
                'font-semibold text-lg',
                isSelected ? 'text-white' : 'text-gray-800'
              )}
            >
              {address.city}
            </h2>
            <div className='flex items-center gap-1'>
              {/* Circular icon background */}
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full',
                  isSelected
                    ? 'bg-zinc-300 text-maroon-600'
                    : 'bg-maroon-600 text-white'
                )}
              >
                <Phone className='w-3 h-3 ' />
              </span>
              <span className='text-sm'>{address.phone}</span>
            </div>
          </div>

          <span
            className={cn(
              'text-sm inline-block px-2 py-0.5 rounded-full max-w-full  self-start',
              isSelected ? 'bg-[#27272A] text-white/90' : ' bg-zinc-300'
            )}
          >
            {address.street}
          </span>
        </CardContent>
      </Card>
    </>
  );
}
