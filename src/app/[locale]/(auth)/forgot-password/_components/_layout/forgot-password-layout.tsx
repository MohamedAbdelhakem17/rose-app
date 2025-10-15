'use client';

import { useState } from 'react';
import OtpVerificationStep from './../steps/otp-verification-step';
import { FORGOT_PASSWORD_STEEP } from '@/lib/constants/auth.constant';
import { ForgotPasswordStep } from '@/lib/types/auth';
import AuthenticationHeading from '@/app/[locale]/(auth)/_components/_layout/authentication-heading';
import { Button } from '@/components/shared/Button';
import AuthenticationLink from './../../../_components/_layout/authentication-link';

export default function ForgotPasswordLayout() {
  // Email entered by user in step 1
  const [email, setEmail] = useState<string | null>('user@example.com');
  void setEmail;

  // Current step in forgot password flow
  const [step, setStep] = useState<ForgotPasswordStep>(
    FORGOT_PASSWORD_STEEP.OTP
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
      element: <h1>Send Email</h1>,
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
            Enter the OTP Code
          </AuthenticationHeading.title>
        ),
        description: (
          <AuthenticationHeading.description>
            We have sent a 6-digit code to {email}
            <Button
              type={'button'}
              onClick={() => setStep(FORGOT_PASSWORD_STEEP.EMAIL)}
              variant={'link'}
              className='p-0 text-blue-600 underline text-base font-medium ms-1'
            >
              Edit
            </Button>
          </AuthenticationHeading.description>
        ),
      },
      element: <OtpVerificationStep setStep={setStep} />,
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
    <div>
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
    </div>
  );
}
