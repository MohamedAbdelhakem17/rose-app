'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { otpSchema, OtpValues } from '@/lib/schemes/auth.schema';
import useOtpVerify from './../../_hooks/use-otp-verify';
import { toast } from 'sonner';
import { Button } from '@/components/shared/Button';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';

type OtpVerificationStepProps = {
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
};

export default function OtpVerificationStep({
  setStep,
}: OtpVerificationStepProps) {
  // Hooks
  const { verifyOtp, isPending } = useOtpVerify();

  // Form and validations
  const form = useForm<OtpValues>({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(otpSchema),
  });

  // Function
  const onSubmit: SubmitHandler<OtpValues> = ({ resetCode }) => {
    verifyOtp(resetCode, {
      // otp success verify
      onSuccess: message => {
        toast.success(message || 'OTP verified successfully!');

        // Go to next step create password
        setStep(FORGOT_PASSWORD_STEEP.CREATE_PASSWORD);
      },

      // otp failed verify
      onError: error => {
        toast.error(error.message || 'Invalid OTP. Please try again.');
      },
    });
  };

  // Variables
  const {
    isValid,
    isSubmitted,
    errors: { resetCode },
  } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-9 mt-6 pt-5'
      >
        {/* OTP Field */}
        <FormField
          control={form.control}
          name='resetCode'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  {/* Label */}
                  <FormLabel className='sr-only'>Verify OTP</FormLabel>

                  {/* Input */}
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      // DIGITS
                      <InputOTPSlot
                        key={index}
                        index={index}
                        isError={!!resetCode}
                      />
                    ))}
                  </InputOTP>
                </>
              </FormControl>

              {/* New code */}
              <p className='text-end py-4 mt-4 mb-9'>Send a new code</p>

              {/* Error Feedback */}
              <FormMessage className='text-center' />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          variant='primary'
          disabled={(isSubmitted && !isValid) || isPending}
          loading={isPending}
          loadingText='Verifying...'
          className='w-full'
        >
          Verify Code
        </Button>
      </form>
    </Form>
  );
}
