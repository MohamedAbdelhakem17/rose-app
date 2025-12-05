export interface CouponData {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
}

export interface AppliedCoupon {
  coupon: CouponData;
  discountAmount: number;
  appliedAt: string;
  _id: string;
}

type ApplyCouponResponse = {
  success: boolean;
  error?: string;
  message?: string; // Add this
  data?: {
    appliedCoupons: AppliedCoupon[];
    discountAmount: number;
    totalPrice: number;
    totalAfterDiscount: number;
  };
};
interface UseCouponDiscountState {
  appliedCoupons: AppliedCoupon[];
  discountAmount: number;
  totalPrice: number;
  totalAfterDiscount: number;
}

interface UseCouponDiscountReturn extends UseCouponDiscountState {
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: (couponId: string) => void;
  reset: () => void;
  isLoading: boolean;
  error: string | null;
}

interface CouponSummaryProps {
  subtotal: number;
}
