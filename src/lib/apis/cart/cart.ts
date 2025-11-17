export interface Cart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  id: string;
}
export interface CartResponse {
  message: string;
  numOfCartItems: number;
  cart: Cart;
}

export async function fetchCart(): Promise<CartResponse> {
  const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjhlZTA3YWY3ZmVlNjhhNGMyZWJhZmJhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjIyNzU2MTl9.MQWALjbJZjxiOu-SdCj29ZXhPqcpZcYPRVsacqW8Jfc';

  try {
    const response = await fetch(`${process.env.BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      next: { tags: ['cart-data'] },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch cart data');
    }
    const data: CartResponse = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw new Error('An error occurred while fetching cart data');
  }
}
