'use client';
import ForgotPasswordLayout from './_components/_layout/forgot-password-layout';

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
      {/* Render current step of forgot password steps */}
      <ForgotPasswordLayout />
    </main>
  );
}
