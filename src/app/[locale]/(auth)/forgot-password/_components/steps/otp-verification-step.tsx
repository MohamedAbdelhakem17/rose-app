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
import TimeCount from './../time-count';
import { useTranslations } from 'next-intl';

type OtpVerificationStepProps = {
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
};

export default function OtpVerificationStep({
  setStep,
}: OtpVerificationStepProps) {
  // Localization
  const t = useTranslations();

  // Hooks
  const { verifyOtp, isPending } = useOtpVerify();

  // Form and validation
  const form = useForm<OtpValues>({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(otpSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<OtpValues> = ({ resetCode }) => {
    verifyOtp(resetCode, {
      onSuccess: message => {
        toast.success(message || 'OTP verified successfully!');

        // Go to next step create password
        setStep(FORGOT_PASSWORD_STEEP.CREATE_PASSWORD);
      },
      onError: error => {
        toast.error(error.message || 'Invalid OTP. Please try again.');
      },
    });
  };

  // Variable
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
                  <FormLabel className='sr-only'>{t('verify-otp')}</FormLabel>

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

              {/* resend new code */}
              <TimeCount initialTimeInSeconds={60} />

              {/* Error Feedback */}
              <FormMessage className='text-center' />
            </FormItem>
          )}
        />

        {/* submit Button */}
        <Button
          type='submit'
          variant='primary'
          disabled={(isSubmitted && !isValid) || isPending}
          loading={isPending}
          loadingText={t('verifying-otp')}
          className='w-full'
        >
          {t('verify-otp-action')}
        </Button>
      </form>
    </Form>
  );
}
