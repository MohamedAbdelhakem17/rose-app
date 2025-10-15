'use client';
import React from 'react';
import { Section } from '@/components/layout';
import { Link } from '@/i18n/navigation';
import { useForgotPassword } from './_hooks/use-forgot-password';
import { useResetPassword } from './_hooks/use-reset-password';
import AuthenticationHeading from '../_components/_layout/authentication-heading';
import { ForgotPasswordForm } from './_components/steps/forgot-password-step';
import { ResetPasswordForm } from './_components/steps/reset-password-step';
import { AuthRedirect } from './_components/_shared/auth-redirect';

export default function ForgotPassword() {
  // hooks
  const { mutate: forgotMutate, isPending: isForgotPending } =
    useForgotPassword();
  const { mutate: resetMutate, isPending: isResetPending } = useResetPassword();

  return (
    <main>
      <Section className='max-w-md mx-auto rounded-2xl py-6'>
        {/* reusable section heading */}
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

        {/* can be rendered using different props depends on the current rendered component also will be handled by colleague */}
        <AuthRedirect
          message='Already have an account?'
          linkText='Sign in'
          href='/login'
        />
      </Section>
    </main>
  );
}
