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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPasswordSchema } from '@/hooks/use-forgot-password-schema';
import { useTranslations } from 'next-intl';
import {
  ForgotPasswordInputs,
  ForgotPasswordFormProps,
} from '@/lib/types/auth';

export function ForgotPasswordForm({
  onSubmit,
  isPending = false,
  buttonText,
}: ForgotPasswordFormProps) {
  const t = useTranslations();
  const schema = useForgotPasswordSchema();

  const form = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(data => onSubmit(data.email))}
        className='space-y-5 pb-3'
      >
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
            buttonText || t('forgot-button-text')
          )}
        </Button>
      </form>
    </Form>
  );
}
