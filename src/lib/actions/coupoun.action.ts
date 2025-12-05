'use server';

import { getToken } from '@/lib/utils/cookies';
import { ApplyCouponResponse } from '../types/coupouns';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('BASE_URL environment variable is not defined');
}

export async function applyCouponAction(
  couponCode: string
): Promise<ApplyCouponResponse> {
  try {
    // Get authentication token
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: 'Authentication token not found',
      };
    }

    // Make API request to apply coupon
    const response = await fetch(`${BASE_URL}/api/v1/coupons/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        code: couponCode,
      }),
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json();

      // Log the entire error response to see its structure
      console.error('API error response:', errorData);
      console.error('Response status:', response.status);

      // Try multiple possible error field names
      const errorMessage =
        errorData.message ||
        errorData.error ||
        errorData.msg ||
        errorData.detail ||
        `Failed to apply coupon (${response.status})`;

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Parse successful response
    const responseData = await response.json();

    return {
      success: true,
      data: {
        appliedCoupons: responseData.cart.appliedCoupons,
        discountAmount: responseData.discountAmount,
        totalPrice: responseData.cart.totalPrice,
        totalAfterDiscount: responseData.totalAfterDiscount,
      },
    };
  } catch (error) {
    console.error('Error applying coupon:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
