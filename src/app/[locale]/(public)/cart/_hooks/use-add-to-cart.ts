'use client';

import { useMutation } from '@tanstack/react-query';
import { addToCartAction } from '../_actions/add-to-cart';
import { toast } from 'sonner';

export function useAddToCart() {
  return useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      return await addToCartAction(productId);
    },
    onSuccess: () => {
      toast.success('item add to cart');
    },
    onError: () => {
      toast.error('failed to add to card');
    },
  });
}
