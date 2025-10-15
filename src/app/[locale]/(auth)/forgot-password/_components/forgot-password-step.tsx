'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  ForgotPasswordInputs,
  ForgotPasswordFormProps,
} from '@/lib/types/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/lib/schemes/forgot-password.schema';

export function ForgotPasswordForm({
  onSubmit,
  isPending = false,
  buttonText = 'Continue',
}: ForgotPasswordFormProps) {
  
  //hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(data => onSubmit(data.email))}
      className='space-y-5 pb-3'
    >
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='email' className='text-sm font-medium capitalize'>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='user@example.com'
          {...register('email')}
        />
        {errors.email && (
          <p className='text-sm text-red-500'>{errors.email.message}</p>
        )}
      </div>

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
  );
}
