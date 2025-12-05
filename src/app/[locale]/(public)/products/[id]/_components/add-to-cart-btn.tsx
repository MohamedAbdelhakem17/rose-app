'use client';

import { useAddToCart } from '@/app/[locale]/(public)/cart/_hooks/use-add-to-cart';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

interface Iprops {
  productId: string;
  quantityOfItem: number;
}

export default function AddToCartBtn({ productId, quantityOfItem }: Iprops) {
  const { mutate: addToCart, isPending } = useAddToCart();
  const isDisable = isPending || quantityOfItem <= 0;

  return (
    <Button
      onClick={() => {
        addToCart({ productId });
      }}
      className='flex-1 gap-2.5 px-4 py-2.5 flex justify-center items-center '
      disabled={isDisable}
    >
      {isPending ? (
        <span>Adding...</span>
      ) : (
        <>
          <ShoppingCart strokeWidth={1.5} />
          Add to Cart
        </>
      )}
    </Button>
  );
}
