import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { resetPasswordAction } from '@/lib/actions/reset-password-action';
import { ResetPasswordResponse } from '@/lib/types/reset-password';

export function useResetPassword() {
  const mutationFn = async ({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }): Promise<ResetPasswordResponse> => {
    // Basic client-side validation
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('newPassword', password);

    return await resetPasswordAction(formData);
  };

  // mutation function
  return useMutation<
    ResetPasswordResponse,
    Error,
    { password: string; confirmPassword: string }
  >({
    mutationFn,

    onSuccess: data => {
      toast.success(data.message || 'Password reset successful!');
    },

    onError: error => {
      toast.error(error?.message || 'Something went wrong');
    },
  });
}
