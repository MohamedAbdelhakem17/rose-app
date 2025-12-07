'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { removeProductAction } from '../_actions/remove-specific-product.action';

export default function useRemoveProductItem(productId: string) {
  return useMutation({
    mutationFn: async () => {
      return await removeProductAction(productId);
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
