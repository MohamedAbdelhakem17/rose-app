export type ResetPasswordResponse = {
  message: string;
  token?: string;
  error?: string;
};

export type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordFormProps = {
  onSubmit: (data: { password: string; confirmPassword: string }) => void;
  isPending?: boolean;
  buttonText?: string;
};
