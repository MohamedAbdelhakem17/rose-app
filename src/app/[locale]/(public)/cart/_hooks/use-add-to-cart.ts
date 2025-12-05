'use client';

import { useMutation } from '@tanstack/react-query';
import { addToCartAction } from '../_actions/add-to-cart.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useAddToCart() {
    const router = useRouter()

  return useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      return await addToCartAction(productId);
    },
    onSuccess: () => {
      toast.success('item add to cart');
      router.push('/cart')
    },
    onError: () => {
      toast.error('failed to add to card');
    },
  });
}
