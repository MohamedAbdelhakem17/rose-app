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
import {
  ForgotPasswordInputs,
  ForgotPasswordFormProps,
} from '@/lib/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/schemes/auth.schemes';

export function ForgotPasswordForm({
  onSubmit,
  isPending = false,
  buttonText = 'Continue',
}: ForgotPasswordFormProps) {
  //form hook
  const form = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='user@example.com' {...field} />
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
              <span>Sending...</span>
            </>
          ) : (
            buttonText
          )}
        </Button>
      </form>
    </Form>
  );
}
