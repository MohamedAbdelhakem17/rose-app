'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils/utils';
import { useLocale } from 'next-intl';

type PasswordInputProps = {
  name: string;
  placeholder: string;
  required: boolean;
};

export function PasswordInput({
  name,
  placeholder,
  required,
}: PasswordInputProps) {
  // States
  const [showPassword, setShowPassword] = useState(false);

  // Locale
  const locale = useLocale();

  // Context
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Variables
  const errorMessage = errors[name]?.message as string | undefined;
  const isRTL: boolean = locale === 'ar';

  return (
    <>
      <div className='relative'>
        <Input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={cn(
            'h-12 border',
            errorMessage ? 'border-red-600' : 'border-zinc-300'
          )}
          required={required}
          {...register(name)}
        />

        <button
          type='button'
          onClick={() => setShowPassword(prev => !prev)}
          className={cn(
            'absolute  top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700',
            isRTL ? 'left-3' : 'right-3'
          )}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className='w-5 h-5' />
          ) : (
            <Eye className='w-5 h-5' />
          )}
        </button>
      </div>
      {errorMessage && (
        <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>
      )}
    </>
  );
}
