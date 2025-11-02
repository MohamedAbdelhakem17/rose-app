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
import { loginSchema, LoginValues } from '@/lib/schemes/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorApi from '../../_components/error-api';

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
        className='capitalize font-inter font-medium w-[404px] py-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Email */}
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel>{t('email-label')}</FormLabel>

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
                <FormLabel>{t('password-label')}</FormLabel>

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
        {error && <ErrorApi error={error.message} />}

        {/* Submit */}
        <Button
          type='submit'
          variant={'primary'}
          disabled={isPending || form.formState.isSubmitting}
          className='font-sarabun w-full'
        >
          {t('login-button')}
        </Button>
      </form>
    </Form>
  );
}
