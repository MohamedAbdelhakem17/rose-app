'use client';

import { Button } from '@/components/ui/button';
import { BrushCleaning } from 'lucide-react';
import React from 'react';
import { useClearCart } from '../_hooks/use-clear-cart';

export default function ClearCart() {
  const { mutate:clearCart, isPending } = useClearCart();
  return (
    <>
      {/* // Clear Cart Button */}
      <Button
        onClick={() => clearCart()}
        disabled={isPending}
        className=' w-40 px-1.5 font-semibold text-sm py-2.5 bg-maroon-50 text-maroon-600 hover:bg-maroon-100 flex items-center gap-1.5'
      >
        {isPending ? (
          <span>Clearing...</span>
        ) : (
          <>
            <BrushCleaning size={16} />
            Clear Cart
          </>
        )}
      </Button>
    </>
  );
}
