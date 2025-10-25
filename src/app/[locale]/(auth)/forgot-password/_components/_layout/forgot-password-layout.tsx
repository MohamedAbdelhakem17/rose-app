'use client';

import AuthenticationHeading from '@/app/[locale]/(auth)/_components/_layout/authentication-heading';
import { Button } from '@/components/ui/button';
import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { useState } from 'react';
import { ForgotPasswordForm } from '../steps/forgot-password-step';
import { ResetPasswordForm } from '../steps/reset-password-step';
import AuthenticationLink from './../../../_components/_layout/authentication-link';
import OtpVerificationStep from './../steps/otp-verification-step';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordLayout() {
  // Localization
  const t = useTranslations();

  // Email entered by user in step 1
  const [email, setEmail] = useState<string | null>(null);

  // Current step in forgot password flow
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEEP.EMAIL
  );

  //  Forgat password  steps
  const STEPS = {
    [FORGOT_PASSWORD_STEEP.EMAIL]: {
      heading: {
        title: (
          <AuthenticationHeading.title className='capitalize'>
            {t('forgot-password-title')}
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description className='first-letter:capitalize'>
            {t('forgot-password-description')}
          </AuthenticationHeading.description>
        ),
      },
      element: (
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          setStep={setStep}
        />
      ),

      footer: (
        <AuthenticationLink
          message={t('forgot-password-redirect-message')}
          link={{
            label: t('forgot-password-redirect-link'),
            href: '/login',
          }}
        />
      ),
    },

    [FORGOT_PASSWORD_STEEP.OTP]: {
      heading: {
        title: (
          <AuthenticationHeading.title>
            {t('enter-otp-label')}
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description>
            {t.rich('otp-edit-email', {
              email: email as string,
              edit: (chunks: React.ReactNode) => (
                <Button
                  type='button'
                  onClick={() => setStep(FORGOT_PASSWORD_STEEP.EMAIL)}
                  variant='link'
                  className='p-0 text-blue-600 underline text-base font-medium ms-1'
                >
                  {chunks}
                </Button>
              ),
            })}
          </AuthenticationHeading.description>
        ),
      },
      element: <OtpVerificationStep setStep={setStep} />,
      footer: (
        <AuthenticationLink
          message={t('need-help')}
          link={{
            label: t('contact-us-label'),
            href: '/contact-us',
          }}
        />
      ),
    },

    [FORGOT_PASSWORD_STEEP.CREATE_PASSWORD]: {
      heading: {
        title: (
          <AuthenticationHeading.title className='capitalize'>
            {t('reset-password-title')}
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description className='first-letter:capitalize'>
            {t('reset-password-description')}
          </AuthenticationHeading.description>
        ),
      },
      element: <ResetPasswordForm email={email} />,
      footer: (
        <AuthenticationLink
          message='Need help?'
          link={{
            label: 'Contact us',
            href: '/contact-us',
          }}
        />
      ),
    },
  };

  return (
    <>
      {/* Header */}
      <AuthenticationHeading>
        {/* Title  */}
        {STEPS[step].heading.title}

        {/* Description */}
        {STEPS[step].heading.description}
      </AuthenticationHeading>

      {/* Form */}
      {STEPS[step].element}

      {/* Footer */}
      {STEPS[step].footer}
    </>
  );
}
