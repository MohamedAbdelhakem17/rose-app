import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotPasswordAction } from '@/lib/actions/forgot-password-action';
import { ForgotPasswordResponse } from '@/lib/types/auth';

export function useForgotPassword() {
  // main mutation
  const mutationFn = async (email: string): Promise<ForgotPasswordResponse> => {
    return await forgotPasswordAction({ email });
  };
  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn,

    onError: error => {
      toast.error(error?.message || 'Something went wrong');
      console.error('Forgot Password Error:', error.message);
    },
  });
}
