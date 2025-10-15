'use client';
import React from 'react';
import { Section } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { useForgotPassword } from './_hooks/use-forgot-password';
import { useResetPassword } from './_hooks/use-reset-password';
import AuthenticationHeading from '../_components/_layout/authentication-heading';
import { ForgotPasswordForm } from './_components/forgot-password-step';
import { ResetPasswordForm } from './_components/reset-password-step';

export default function ForgotPassword() {
  // hooks
  const { mutate: forgotMutate, isPending: isForgotPending } =
    useForgotPassword();
  const { mutate: resetMutate, isPending: isResetPending } = useResetPassword();

  return (
    <main>
      <Section className='max-w-md mx-auto rounded-2xl py-6'>
        <AuthenticationHeading>
          <AuthenticationHeading.title className='capitalize'>
            forgot password
          </AuthenticationHeading.title>

          <AuthenticationHeading.description className='first-letter:capitalize'>
            worry not, we&apos;ll send you instructions to help you reset it.
          </AuthenticationHeading.description>
        </AuthenticationHeading>

        {/* the forms are rendered like this for now until my colleague conditionally renders them after he implements the otp */}

        {/* Forgot Password Form */}
        <ForgotPasswordForm
          isPending={isForgotPending}
          onSubmit={email => forgotMutate(email)}
        />

        {/* Reset Password Form */}
        <ResetPasswordForm
          isPending={isResetPending}
          onSubmit={data => resetMutate(data)} // pass the object { password, confirmPassword }
        />


      {/* already made a reusable component by my colleague but we're waiting to publish the pr as you mentioned */}
        <div className='flex justify-center items-center mt-4'>
          <p className='flex gap-2'>
            Don&apos;t have an account yet?
            <span className='text-maroon-700 dark:text-pink-300 font-semibold hover:text-maroon-900 dark:hover:text-pink-500'>
              <Link href='/create-account'>create one now!</Link>
            </span>
          </p>
        </div>
      </Section>
    </main>
  );
}
