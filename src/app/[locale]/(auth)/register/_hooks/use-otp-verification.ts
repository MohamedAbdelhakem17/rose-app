import { otpVerification } from '@/lib/actions/forgot-password.action';
import { useMutation } from '@tanstack/react-query';

export default function useMarkNotificationRead(resetCode: string) {
  const { mutate: verifyOtp, isPending } = useMutation({
    mutationKey: ['verify-otp'],

    mutationFn: async () => {
      const payload = await otpVerification(resetCode);

      return payload;
    },
  });

  return { verifyOtp, isPending };
}
