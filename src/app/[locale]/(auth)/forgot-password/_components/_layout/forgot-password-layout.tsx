'use client';

import { useState } from 'react';
import OtpVerificationStep from './../steps/otp-verification-step';
import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';
import { ForgotPasswordStep } from '@/lib/types/auth';
import AuthenticationHeading from '@/app/[locale]/(auth)/_components/_layout/authentication-heading';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/ui/Input';
import AuthenticationLink from './../../../_components/_layout/authentication-link';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordLayout() {
  // Localization
  const t = useTranslations();

  // Email entered by user in step 1
  const [email, setEmail] = useState<string | null>(null);
  void setEmail;

  // Current step in forgot password flow
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEEP.EMAIL
  );

  //  Forgat password  steps
  const STEPS = {
    [FORGOT_PASSWORD_STEEP.EMAIL]: {
      heading: {
        title: (
          <AuthenticationHeading.title>
            Forgot Password?
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description>
            Worry not, we’ll send you instructions to help you reset it.
          </AuthenticationHeading.description>
        ),
      },
      element: (
        <div className='w-96 p-5'>
          <label htmlFor='forgot-email' className='sr-only'>
            Email address
          </label>

          <Input
            id='forgot-email'
            type='email'
            placeholder='Enter your email'
            value={email || ''}
            onChange={e => setEmail(e.target.value)}
            className='w-full'
          />

          <Button
            type='button'
            className='w-full mt-4'
            onClick={() => {
              if (email) {
                setStep(FORGOT_PASSWORD_STEEP.OTP);
              }
            }}
            disabled={!email}
          >
            Send Email
          </Button>
        </div>
      ),
      footer: (
        <AuthenticationLink
          message='Don’t have an account yet?'
          link={{
            label: ' Create one now!',
            href: '/register',
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
          <AuthenticationHeading.title>
            Create a new password
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description>
            Set a strong password to secure your account.
          </AuthenticationHeading.description>
        ),
      },
      element: <h1>Create Password</h1>,
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
