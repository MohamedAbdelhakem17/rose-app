'use client';

import { Input } from '@/components/shared';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginSchema, LoginValues } from '@/lib/schemas/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorApi from '../../_components/error-api';
import { cn } from '@/lib/utils/utils';
import { Loader2Icon } from 'lucide-react';

export default function LoginForm() {
  // Translate
  const t = useTranslations();

  // Mutation
  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) throw new Error(response.error);
      if (response?.url) {
        window.location.href =
          new URLSearchParams(location.search).get('callbackUrl') || '/';
      }

      return response;
    },
  });

  // Form
  const form = useForm<LoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Functions
  const onSubmit: SubmitHandler<LoginValues> = async values => {
    mutate(values);
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
              <FormLabel
                className={cn(
                  'text-gray-800 dark:text-white',
                  form.formState.errors.email &&
                    'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('email-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  placeholder='user@example.com'
                  className={`${form.formState.errors.email?.message && 'border-red-600 dark:border-soft-pink-500 focus:ring-red-600 dark:focus:ring-soft-pink-600'}`}
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
                <FormLabel
                  className={cn(
                    'text-gray-800 dark:text-white',
                    form.formState.errors.password &&
                      'text-red-500 dark:text-soft-pink-700'
                  )}
                >
                  {t('password-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  {/* <PasswordInput> */}
                  <Input
                    type='password'
                    placeholder='********'
                    className={`${form.formState.errors.password?.message && 'border-red-600 dark:border-soft-pink-500 focus:ring-red-600 dark:focus:ring-soft-pink-600'}`}
                    {...field}
                  />
                  {/* </PasswordInput> */}
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
            className=' font-medium text-sm font-geistMono text-maroon-700 dark:text-soft-pink-300 pt-2.5 pb-10 '
          >
            {t('forgot-password-paragraph')}
          </Link>
        </div>

        {/* Api Error */}
        {error && <ErrorApi error={error.message} />}

        {/* Submit */}
        <Button
          type='submit'
          variant={'primary'}
          disabled={isPending || form.formState.isSubmitting}
          className='capitalize font-sarabun w-full'
        >
          {isPending ? (
            <Loader2Icon className='animate-spin w-6 h-6 mx-auto' />
          ) : (
            t('login-button')
          )}
        </Button>

        <p className='w-full border-t pt-5 mt-9 font-sarabun border-zinc-200 text-zinc-800 dark:text-white text-center'>
          {t('login-p')}{' '}
          <Link
            href={'/register'}
            className='text-maroon-800 dark:text-soft-pink-300'
          >
            {t('login-p-action')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
