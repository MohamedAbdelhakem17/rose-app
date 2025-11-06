'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { useRemoveCartItem } from '../../../_hooks/use-remove-cart-item';

interface RemoveElementProps {
  itemid: string;
  productTitle:string
}
export default function RemoveElement({ itemid , productTitle}: RemoveElementProps) {
  const { mutate, isPending } = useRemoveCartItem(itemid , productTitle);

  return (
    <Button
      onClick={() => mutate()}
      className=' h-10 p-2.5 capitalize font-medium text-sm  bg-red-600 text-white flex items-center gap-1 hover:bg-red-800'
    >
      {isPending ? (
        'Removing...'
      ) : (
        <>
          <Trash2 size={20} /> remove{' '}
        </>
      )}
    </Button>
  );
}
