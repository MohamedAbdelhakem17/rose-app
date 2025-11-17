'use client';

import { useMutation } from '@tanstack/react-query';
import { clearCartAction } from '../_actions/clear-cart.action';
import { toast } from 'sonner';

export function useClearCart() {
  return useMutation({
    mutationFn: async () => {
      return await clearCartAction();
    },
    onSuccess: () => {
      toast.success('Cart cleared successfully');
    },
    onError: error => {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    },
  });
}
