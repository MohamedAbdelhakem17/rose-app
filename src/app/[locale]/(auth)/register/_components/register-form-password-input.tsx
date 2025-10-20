'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/Input';

type PasswordInputProps = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export function PasswordInput({
  name,
  label,
  placeholder,
  required,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col gap-2'>
      <Label
        htmlFor={name}
        className={`text-sm font-medium ${errorMessage ? 'text-red-600' : 'text-zinc-800'}`}
      >
        {label}
      </Label>

      <div className='relative'>
        <Input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`h-12 border ${
            errorMessage ? 'border-red-600' : 'border-zinc-300'
          }`}
          required={required}
          {...register(name)}
        />

        <button
          type='button'
          onClick={() => setShowPassword(prev => !prev)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
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
    </div>
  );
}
