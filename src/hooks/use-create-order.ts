'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner'; // Import Sonner toast for notifications
import { createCashOrder, createCardOrder } from '@/lib/actions/order.action';
import { CreateOrderParams } from '@/lib/types/checkout';
import { useRouter } from 'next/navigation'; // Import Next.js router

// Custom hook to handle creating orders (cash or card)
export function useCreateOrder() {
  const router = useRouter(); // Initialize router for navigation

  return useMutation({
    // Main mutation function
    // Decides which API function to call based on payment method
    mutationFn: async ({ payload, paymentMethod }: CreateOrderParams) => {
      if (paymentMethod === 'cash') {
        return createCashOrder(payload); // Call cash order API
      } else {
        return createCardOrder(payload); // Call card order API
      }
    },

    // Called when the mutation succeeds
    onSuccess: data => {
      // If the response contains a Stripe session, redirect to Stripe Checkout
      if ('session' in data && data.session?.url) {
        window.location.href = data.session.url;
      } else {
        // Show success toast for cash orders or other successful responses
        toast.success('Order placed successfully!');
        // Navigate the user to the orders page
        router.push('/orders');
      }
    },

    // Called when the mutation fails
    onError: (error: any) => {
      // Log the error for debugging
      console.error('Failed to create order:', error);

      // Show an error toast with the error message or a fallback
      toast.error(
        error?.message || 'Something went wrong while placing the order.'
      );
    },
  });
}
