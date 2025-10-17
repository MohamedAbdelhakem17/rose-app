import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { forgotPasswordAction } from '@/lib/actions/forgot-password-action';
import { ForgotPasswordResponse } from '@/lib/types/auth';
import useCookie from '@/hooks/use-cookie';

export function useForgotPassword() {
  // initialize cookie hook
  const { setCookieValue } = useCookie({
    name: 'reset_email',
    expireInMinutes: 15, // cookie expires in 15 minutes
    allowOverwrite: true,
  });

  // main mutation
  const mutationFn = async (email: string): Promise<ForgotPasswordResponse> => {
    return await forgotPasswordAction({ email });
  };
  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn,

    onSuccess: (data, email) => {
      // store the email in cookies
      setCookieValue(email);

      // show success message
      toast.success(data.info || 'Email sent successfully!');
      console.log('Forgot Password Success:', data);
    },

    onError: error => {
      toast.error(error?.message || 'Something went wrong');
      console.error('Forgot Password Error:', error.message);
    },
  });
}
