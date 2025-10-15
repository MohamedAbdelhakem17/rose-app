import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';

// User type — reusable across your app
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  phone: string;
  photo: string;
  role: 'user' | 'admin';
  createdAt: string;
}

// Success response
export interface RegisterSuccessResponse {
  message: 'success';
  user: User;
  token: string;
}

// Error response
export interface RegisterErrorResponse {
  error: string;
}

// Final union type
export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;

type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEEP)[keyof typeof FORGOT_PASSWORD_STEEP];

export { ForgotPasswordStep };
