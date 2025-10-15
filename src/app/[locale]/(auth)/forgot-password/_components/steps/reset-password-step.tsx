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
import { PasswordInput } from '@/components/shared/password-input'; // the reusable component we made
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordInputs, ResetPasswordFormProps } from '@/lib/types/auth';
import { resetPasswordSchema } from '@/lib/schemes/auth.schemes';

export function ResetPasswordForm({
  onSubmit,
  isPending = false,
  buttonText = 'Reset Password',
}: ResetPasswordFormProps) {
  //form hook
  const form = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
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
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='Enter your new password'
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
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='Confirm your new password'
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
              <span>Submitting...</span>
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </Form>
  );
}
