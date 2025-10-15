// types/auth.ts

/** API Response Types */
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
  onSubmit: (email: string) => void;
  isPending?: boolean;
  buttonText?: string;
};

type ResetPasswordFormProps = {
  onSubmit: (data: { password: string; confirmPassword: string }) => void;
  isPending?: boolean;
  buttonText?: string;
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

/** Export all at once */
export {
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ForgotPasswordFormProps,
  ResetPasswordFormProps,
  ForgotPasswordInputs,
  ResetPasswordInputs,
  OtpVerificationResponse,
};
