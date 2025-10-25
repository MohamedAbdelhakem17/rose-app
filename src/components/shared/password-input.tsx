'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  // detect direction (ltr or rtl) to switch the eye icon position
  const dir =
    typeof document !== 'undefined'
      ? document.documentElement.getAttribute('dir')
      : 'ltr';
  const isRTL = dir === 'rtl';

  return (
    <div className='relative w-full'>
      <Input
        type={show ? 'text' : 'password'}
        {...props}
        className={`${isRTL ? 'pl-10' : 'pr-10'} ${className}`}
      />
      <Button
        type='button'
        onClick={() => setShow(s => !s)}
        className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-md ${
          isRTL ? 'left-0' : 'right-0 '
        }`}
        variant='ghost'
        size='icon'
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
      </Button>
    </div>
  );
}
