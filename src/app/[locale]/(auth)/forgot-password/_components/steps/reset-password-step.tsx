'use client';

import { useForm } from 'react-hook-form';
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

export function ResetPasswordForm({
  onSubmit,
  isPending = false,
  buttonText,
}: ResetPasswordFormProps) {
  const t = useTranslations();
  const schema = useResetPasswordSchema();

  const form = useForm<ResetPasswordFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

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
            buttonText || t('reset-button-text')
          )}
        </Button>
      </form>
    </Form>
  );
}
