import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';


// types/auth.ts
/** API Response Types */
export interface LoginResponse {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    photo: string;
    role: string;
    wishlist: [];
    addresses: [];
  };
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
