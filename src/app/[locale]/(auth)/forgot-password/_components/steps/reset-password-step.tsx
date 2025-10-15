'use client';

import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ResetPasswordInputs,
  ResetPasswordFormProps,
} from '@/lib/types/reset-password';
import { resetPasswordSchema } from '@/lib/schemes/reset-password-schema';

export function ResetPasswordForm({
  onSubmit,
  isPending = false,
  buttonText = 'Reset Password',
}: ResetPasswordFormProps) {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(data => onSubmit(data))}
      className='space-y-5 pb-3'
    >
      {/* Password */}
      <div className='flex flex-col space-y-2'>
        <Label htmlFor='password' className='text-sm font-medium capitalize'>
          new password
        </Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your new password'
          {...register('password')}
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className='flex flex-col space-y-2'>
        <Label
          htmlFor='confirmPassword'
          className='text-sm font-medium capitalize'
        >
          confirm password
        </Label>
        <Input
          id='confirmPassword'
          type='password'
          placeholder='Confirm your new password'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className='text-sm text-red-500'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isPending}
        className='w-full capitalize flex items-center justify-center gap-2'
      >
        {isPending ? (
          <>
            <div className='h-4 w-4 border-2 capitalize border-white border-t-transparent rounded-full animate-spin' />
            <span>submitting...</span>
          </>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
}
