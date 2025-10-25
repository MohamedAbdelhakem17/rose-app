'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPasswordSchema } from '@/hooks/use-forgot-password-schema';
import { useTranslations } from 'next-intl';
import {
  ForgotPasswordInputs,
  ForgotPasswordFormProps,
} from '@/lib/types/auth';
import { useForgotPassword } from '../../_hooks/use-forgot-password';
import { toast } from 'sonner';
import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';

export function ForgotPasswordForm({
  email,
  setEmail,
  setStep,
}: ForgotPasswordFormProps) {
  // Translations
  const t = useTranslations();
  const schema = useForgotPasswordSchema();

  //Mutations
  const { mutate: forgotMutate, isPending } = useForgotPassword();

  //Functions
  const onSubmit: SubmitHandler<ForgotPasswordInputs> = ({ email }) => {
    forgotMutate(email, {
      onSuccess: message => {
        toast.success(message.message || 'OTP sent successfully!');
        // set email
        setEmail(email);
        // Go to next step OTP page
        setStep(FORGOT_PASSWORD_STEEP.OTP);
      },
      onError: error => {
        toast.error(error.message || "Couldn't send OTP");
      },
    });
  };

  const form = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email: email || '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 pb-3'>
        {/* email field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('forgot-email-label')}</FormLabel>
              <FormControl>
                <Input placeholder={t('forgot-email-placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* submit button */}
        <Button
          type='submit'
          disabled={isPending}
          className='w-full capitalize flex items-center justify-center gap-2'
        >
          {isPending ? (
            <>
              <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>{t('forgot-button-loading')}</span>
            </>
          ) : (
            t('forgot-button-text')
          )}
        </Button>
      </form>
    </Form>
  );
}
