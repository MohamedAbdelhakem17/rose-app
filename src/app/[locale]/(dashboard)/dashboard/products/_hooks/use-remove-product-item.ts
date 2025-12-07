'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removeProduct } from '../_actions/remove-specific-product.action';

export function useRemoveProductItem(productId: string) {
  return useMutation({
    mutationFn: async () => {
      return await removeProduct(productId);
    },
    onSuccess: () => {
      toast.success('Product removed successfully');
    },
    onError: error => {
      console.error('Error removing product:', error);
      toast.error('Failed to remove product');
    },
  });
}