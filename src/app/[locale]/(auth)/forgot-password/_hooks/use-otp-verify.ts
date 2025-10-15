import { otpVerification } from '@/lib/actions/otp-verification-action';
import { OtpVerificationResponse } from '@/lib/types/auth/forgot-password';
import { useMutation } from '@tanstack/react-query';

export default function useOtpVerify() {
  const { mutate: verifyOtp, isPending } = useMutation({
    mutationKey: ['verify-otp'],

    mutationFn: async (resetCode: string) => {
      // Verify otp
      const payload: OtpVerificationResponse = await otpVerification(resetCode);

      // If failed verify
      if ('error' in payload) {
        throw new Error(payload.error);
      }

      // success case
      return payload.message;
    },
  });

  return { verifyOtp, isPending };
}
