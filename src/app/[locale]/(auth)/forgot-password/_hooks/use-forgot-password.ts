import { useMutation } from '@tanstack/react-query';
import { forgotPasswordAction } from '@/lib/actions/forgot-password-action';
import { ForgotPasswordResponse } from '@/lib/types/forgot-password';

export function useForgotPassword() {
  const mutationFn = async (email: string): Promise<ForgotPasswordResponse> => {
    const formData = new FormData();
    formData.append('email', email);
    return await forgotPasswordAction(formData);
  };

  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn,
    onSuccess: data => {
      console.log('Forgot Password Success:', data);
    },
    onError: error => {
      console.error('Forgot Password Error:', error.message);
    },
  });
}
