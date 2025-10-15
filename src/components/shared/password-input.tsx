'use    ';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className='relative w-full'>
      <Input
        type={show ? 'text' : 'password'}
        {...props}
        className={`pr-10 ${className}`} // add padding for the toggle button
      />
      <Button
        type='button'
        onClick={() => setShow(s => !s)}
        className='absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md'
        variant='ghost'
        size='icon'
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
      </Button>
    </div>
  );
}
