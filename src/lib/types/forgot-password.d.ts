export type ForgotPasswordResponse = {
  message: string;
  info: string;
};
// API Response Types

/** Response: otp verification  */
type OtpVerificationResponse = ApiResponse<''>;

export { OtpVerificationResponse };

export type ForgotPasswordFormProps = {
  onSubmit: (email: string) => void;
  isPending?: boolean;
  buttonText?: string;
};

export type ForgotPasswordInputs = {
  email: string;
};
