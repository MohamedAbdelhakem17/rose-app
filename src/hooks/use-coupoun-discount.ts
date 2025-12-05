import { applyCouponAction } from '@/lib/actions/coupoun.action';
import {
  AppliedCoupon,
  UseCouponDiscountReturn,
  UseCouponDiscountState,
} from '@/lib/types/coupouns';
import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';

const initialState: UseCouponDiscountState = {
  appliedCoupons: [],
  discountAmount: 0,
  totalPrice: 0,
  totalAfterDiscount: 0,
};

export function useCouponDiscount(
  initialTotal: number = 0
): UseCouponDiscountReturn {
  const [state, setState] = useState<UseCouponDiscountState>({
    ...initialState,
    totalPrice: initialTotal,
    totalAfterDiscount: initialTotal,
  });

  const [error, setError] = useState<string | null>(null);

  // Mutation for applying coupon
  const applyCouponMutation = useMutation({
    mutationFn: async (couponCode: string) => {
      if (!couponCode.trim()) {
        throw new Error('Please enter a coupon code');
      }

      try {
        const result = await applyCouponAction(couponCode);


        if (!result.success) {
          // Provide more detailed error information
          const errorMsg =
            result.error || result.message || 'Failed to apply coupon';
          console.error('Coupon application failed:', errorMsg, result);
          throw new Error(errorMsg);
        }

        if (!result.data) {
          console.error('No data returned from coupon action');
          throw new Error('Invalid response from server');
        }

        return result.data;
      } catch (err) {
        // Log the actual error
        console.error('Error in applyCouponAction:', err);
        throw err;
      }
    },
    onSuccess: data => {
      if (data) {
        setState(prev => ({
          ...prev,
          appliedCoupons: data.appliedCoupons,
          discountAmount: data.discountAmount,
          totalPrice: data.totalPrice,
          totalAfterDiscount: data.totalAfterDiscount,
        }));
        setError(null);
      }
    },
    onError: error => {
      console.error('Mutation error:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    },
  });

  const applyCoupon = useCallback(
    async (couponCode: string) => {
      setError(null); // Clear previous errors
      try {
        await applyCouponMutation.mutateAsync(couponCode);
      } catch (err) {
        // Error is already handled by onError, but we can add additional logging
        console.error('Apply coupon failed:', err);
      }
    },
    [applyCouponMutation]
  );

  const removeCoupon = useCallback((couponId: string) => {
    setState(prev => {
      const removedCoupon = prev.appliedCoupons.find(c => c._id === couponId);
      const removedDiscount = removedCoupon?.discountAmount || 0;

      return {
        ...prev,
        appliedCoupons: prev.appliedCoupons.filter(c => c._id !== couponId),
        discountAmount: Math.max(0, prev.discountAmount - removedDiscount),
        totalAfterDiscount:
          prev.totalPrice - (prev.discountAmount - removedDiscount),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState({
      ...initialState,
      totalPrice: initialTotal,
      totalAfterDiscount: initialTotal,
    });
    setError(null);
    applyCouponMutation.reset();
  }, [initialTotal, applyCouponMutation]);

  return {
    ...state,
    applyCoupon,
    removeCoupon,
    reset,
    isLoading: applyCouponMutation.isPending,
    error,
  };
}
