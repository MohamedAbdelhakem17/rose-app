import { Section } from '@/components/layout';
import React from 'react';

export default function ForgotPassword() {
  return (
    <main>
      <Section className='border-4 border-red-500'>
        {/* form title */}
        <h1 className='text-h-4 text-zinc-800 dark:text-zinc-50'>
          Forgot Password?
        </h1>
        {/* form description */}
        <p className='text-p-3  first-letter:capitalize '>
          worry not, we&apos;ll send you instructions to help you reset it.
        </p>
      </Section>
    </main>
  );
}
