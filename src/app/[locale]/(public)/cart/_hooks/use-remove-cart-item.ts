'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removeCartItem } from '../_actions/remove-specific-cart-item';

export function useRemoveCartItem(itemId: string, productTitle: string) {
  return useMutation({
    mutationFn: async () => {
      return await removeCartItem(itemId, productTitle);
    },
    onSuccess: () => {
      toast.success(`${productTitle} removed `);
    },
    onError: error => {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    },
  });
}
