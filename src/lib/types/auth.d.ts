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


// types/auth.ts
/** API Response Types */
export interface LoginResponse {
  user: User;
  token: string;
};

type ForgotPasswordResponse = {
  message: string;
  info: string;
};

type ResetPasswordResponse = {
  message: string;
  token?: string;
  error?: string;
};

/** Form Props */
type ForgotPasswordFormProps = {
  email: string | null;
  setEmail: (email: string) => void;
  setStep: (step: ForgotPasswordStep) => void;
};

type ResetPasswordFormProps = {
  email: string | null;
};

/** Form Inputs */
type ForgotPasswordInputs = {
  email: string;
};

type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

/** OTP Verification Response */
type OtpVerificationResponse = ApiResponse<''>;

type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEEP)[keyof typeof FORGOT_PASSWORD_STEEP];

/** Export all at once */
export {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordFormProps,
  ResetPasswordFormProps,
  ForgotPasswordInputs,
  ResetPasswordInputs,
  OtpVerificationResponse,
  ForgotPasswordStep,
};
