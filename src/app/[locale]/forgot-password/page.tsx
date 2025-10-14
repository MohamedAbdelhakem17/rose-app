'use client';
import React, { useState } from 'react';
import { Section } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Link } from '@/i18n/navigation';
import { useForgotPassword } from './_hooks/use-forgot-password';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email, {
      onSuccess: (data: { message: string; info: string }) => {
        toast.success(data.info || 'Email sent successfully!');
      },
      onError: (error: any) => {
        toast.error(error?.message || 'Something went wrong');
      },
    });
  };
  return (
    <main>
      <Section className='max-w-md mx-auto mt-12 rounded-2xl p-6'>
        <h1 className='text-h-4 text-zinc-800 capitalize dark:text-zinc-50 mb-2'>
          forgot password?
        </h1>

        <p className='text-p-3 text-zinc-600 dark:text-zinc-300 mb-2'>
          worry not, we&apos;ll send you instructions to help you reset it.
        </p>
        <hr className='mb-4' />

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='flex flex-col space-y-2'>
            <Label htmlFor='email' className='text-sm font-medium capitalize'>
              email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='user@example.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type='submit'
            disabled={isPending}
            className='w-full capitalize'
          >
            {isPending ? 'Sending...' : 'Continue'}
          </Button>

          <hr />
          <div className='flex justify-center items-center'>
            <p className='flex gap-2'>
              Don&apos;t have an account yet?
              <span className='text-maroon-700 dark:text-pink-300 font-semibold hover:text-maroon-900 dark:hover:text-pink-500'>
                <Link href='#'>create one now</Link>
              </span>
            </p>
          </div>
        </form>
      </Section>
    </main>
  );
}
