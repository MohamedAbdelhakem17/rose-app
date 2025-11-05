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
          <div
            className={cn(
              'flex items-center gap-1',
              isSelected ? 'text-white' : 'text-gray-600'
            )}
          >
            <Phone className='w-4 h-4' />
            <span className='text-sm'>{address.phone}</span>
          </div>
        </div>
        <p
          className={cn(
            'text-sm text-start',
            isSelected ? 'text-white/90' : 'text-gray-500'
          )}
        >
          {address.street}
        </p>
      </CardContent>
    </Card>
  );
}
