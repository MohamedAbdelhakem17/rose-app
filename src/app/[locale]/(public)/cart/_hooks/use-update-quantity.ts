'use client';

import { useMutation } from '@tanstack/react-query';
import { updateQuantity } from '../_actions/update-quantity';
import { toast } from 'sonner';

interface updateQuantityArgs {
  productId: string;
  quantity: number;
  productTitle: string;
}

export function useUpdateQuantity() {
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
      productTitle,
    }: updateQuantityArgs) => {
      return await updateQuantity(productId, quantity, productTitle);
    },
    onSuccess: (_, { productTitle, quantity }) => {
      toast.success(`${productTitle} quantity updated to ${quantity}`);
    },
    onError : (error)=>{
      console.log(error)
      toast.error('failed to update')
    }
  });
}
