// Common API types and interfaces

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user' | 'moderator';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  role?: 'admin' | 'user' | 'moderator';
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stockQuantity: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: string;
  inStock?: boolean;
  stockQuantity?: number;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// File upload types
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: ValidationError[];
  code?: string;
}

// Common response types
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: ValidationError[];
  code?: string;
}

// API endpoint types
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },

  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/upload-avatar',
  },

  // Products
  PRODUCTS: {
    BASE: '/products',
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
    FEATURED: '/products/featured',
    BY_CATEGORY: (category: string) => `/products/category/${category}`,
  },

  // Orders
  ORDERS: {
    BASE: '/orders',
    MY_ORDERS: '/orders/my-orders',
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },

  // Cart
  CART: {
    BASE: '/cart',
    ADD_ITEM: '/cart/add-item',
    REMOVE_ITEM: '/cart/remove-item',
    UPDATE_QUANTITY: '/cart/update-quantity',
    CLEAR: '/cart/clear',
  },

  // Wishlist
  WISHLIST: {
    BASE: '/wishlist',
    ADD_ITEM: '/wishlist/add-item',
    REMOVE_ITEM: '/wishlist/remove-item',
  },

  // Files
  FILES: {
    UPLOAD: '/files/upload',
    DELETE: (id: string) => `/files/${id}`,
  },
} as const;

// ApiResponse
export type ApiResponse<T> = {
  message: string;
} & T;

// bestselller types
export interface BestSellerResponse {
  message: string,
  products: {
    _id: string,
    title: string,
    imgCover: string,
    price: number,
    priceAfterDiscount: number,
    quantity: number,
    id: string,
    rateCount: number,
    rateAvg: number,
    category: string,
    occasion: string,

  }[]
}

// most popular products
export interface MostPopularResponse {
  message: string,
  metadata: {
    currentPage: number,
    limit: number,
    totalPages: number,
    totalItems: number,

  },
  occasions: {
    _id: string,
    name: string,
    slug: string,
    image: string,
    productsCount: number,
  }[]

}