'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema, LoginValues } from '@/lib/schemes/auth.schema';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, Input } from '@/components/shared';
import ErrorApi from '../../_components/error-api';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Form
  const form = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Submit function
  const onSubmit: SubmitHandler<LoginValues> = async values => {
    setLoading(true);
    setError(null);

    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.error) {
      setError(response.error);
      setLoading(false);
    }

    if (response?.url) {
      // hard redirect
      location.href = new URLSearchParams(location.search).get('callbackUrl') || '/'
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className=' w-[404px]' onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email */}
        <div className=' font-inter'>
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className=' font-medium text-gray-800'>
                  Email
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='text'
                    placeholder='user@example.com'
                    className={`${form.formState.errors.email?.message && 'border-red-600 focus:ring-red-600'}`}
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='font-geistMono font-medium pt-4'>
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className='text-gray-800 '>Password</FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='password'
                    placeholder='********'
                    className={`${form.formState.errors.password?.message && 'border-red-600 focus:ring-red-600'}`}
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Forgot Password */}
        <div className='flex flex-col items-end w-full'>
          <Link
            href={'/forgot-password'}
            className=' font-medium text-sm font-geistMono text-maroon-700 pt-2.5 pb-10 '
          >
            Forgot you password?
          </Link>
        </div>

        {/* Api Error */}
        {error && <ErrorApi error={error} />}

        {/* Submit */}
        <Button
          type='submit'
          variant={'primary'}
          disabled={loading || form.formState.isSubmitting}
          className=' w-full'
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
