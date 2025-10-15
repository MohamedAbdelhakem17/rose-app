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
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  // For Api error
  const [error, setError] = useState<string | null>();

  // For disable button submit
  const [loading, setLoading] = useState<boolean>(false);

  // For translate
  const t = useTranslations();

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
      location.href =
        new URLSearchParams(location.search).get('callbackUrl') || '/';
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className='capitalize font-inter font-medium w-[404px]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email */}
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className='text-gray-800'>
                {t('email-label')}
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

        <div className='pt-4'>
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className='text-gray-800 '>
                  {t('password-label')}
                </FormLabel>

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
        <div className='flex flex-col items-end w-full font-sarabun'>
          <Link
            href={'/forgot-password'}
            className=' font-medium text-sm font-geistMono text-maroon-700 pt-2.5 pb-10 '
          >
            {t('forgot-password-paragraph')}
          </Link>
        </div>

        {/* Api Error */}
        {error && <ErrorApi error={error} />}

        {/* Submit */}
        <Button
          type='submit'
          variant={'primary'}
          disabled={loading || form.formState.isSubmitting}
          className='font-sarabun w-full'
        >
          {t('login-button')}
        </Button>

        <p className='w-full border-t pt-5 mt-9 font-sarabun border-zinc-200 text-zinc-800 text-center'>
          {t('register-paragraph')}
          <Link href={'/register'} className='text-maroon-800'>
            {t('register-paragraph-action')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
