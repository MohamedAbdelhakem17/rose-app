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
import { Button } from '@/components/ui/Button';
import { PasswordInput } from '@/components/shared/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordFields,
  useResetPasswordSchema,
} from '@/hooks/use-reset-password-schema';
import { useTranslations } from 'next-intl';
import { ResetPasswordFormProps } from '@/lib/types/auth';
import { ResetPasswordInputs } from '@/lib/types/auth';
import { useResetPassword } from '../../_hooks/use-reset-password';
import { toast } from 'sonner';

export function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  // Translations
  const t = useTranslations();
  const schema = useResetPasswordSchema();

  //Mutations
  const { mutate: resetMutate, isPending } = useResetPassword();

  //  Form and validations
  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInputs> = ({
    password,
    confirmPassword,
  }) => {
    resetMutate(
      { email: email as string, password, confirmPassword },
      {
        onSuccess: message => {
          toast.success(message.message || 'OTP verified successfully!');
        },
        onError: error => {
          toast.error(error.message || 'Invalid OTP. Please try again.');
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data))}
        className='space-y-5 pb-3'
      >
        {/* Password */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('reset-password-label')}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t('reset-password-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('reset-confirm-label')}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t('reset-confirm-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          disabled={isPending}
          className='w-full capitalize flex items-center justify-center gap-2'
        >
          {isPending ? (
            <>
              <div className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>{t('reset-button-loading')}</span>
            </>
          ) : (
            t('reset-button-text')
          )}
        </Button>
      </form>
    </Form>
  );
}
