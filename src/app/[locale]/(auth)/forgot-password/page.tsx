'use client';
import React from 'react';
import { Section } from '@/components/layout';
import { useForgotPassword } from './_hooks/use-forgot-password';
import { useResetPassword } from './_hooks/use-reset-password';
import AuthenticationHeading from '../_components/_layout/authentication-heading';
import { ForgotPasswordForm } from './_components/steps/forgot-password-step';
import { ResetPasswordForm } from './_components/steps/reset-password-step';
import { AuthRedirect } from './_components/_shared/auth-redirect';
import { useTranslations } from 'next-intl';

export default function ForgotPassword() {
  const t = useTranslations();

  const { mutate: forgotMutate, isPending: isForgotPending } =
    useForgotPassword();
  const { mutate: resetMutate, isPending: isResetPending } = useResetPassword();

  return (
    <main>
      <Section className='max-w-md mx-auto rounded-2xl py-6'>
        <AuthenticationHeading>
          <AuthenticationHeading.title className='capitalize'>
            {t('forgot-password-title')}
          </AuthenticationHeading.title>

          <AuthenticationHeading.description className='first-letter:capitalize'>
            {t('forgot-password-description')}
          </AuthenticationHeading.description>
        </AuthenticationHeading>

        <ForgotPasswordForm
          isPending={isForgotPending}
          onSubmit={email => forgotMutate(email)}
        />

        <ResetPasswordForm
          isPending={isResetPending}
          onSubmit={data => resetMutate(data)}
        />

        <AuthRedirect
          message={t('forgot-password-redirect-message')}
          linkText={t('forgot-password-redirect-link')}
          href='/login'
        />
      </Section>
    </main>
  );
}
