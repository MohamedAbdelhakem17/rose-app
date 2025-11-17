'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

type FormInputProps = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  required: boolean;
};

export default function FormInput({
  name,
  label,
  type,
  placeholder,
  required,
}: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className='flex flex-col gap-1.5'>
      <Label
        htmlFor={name}
        className={`text-sm font-medium ${errorMessage ? 'text-red-600' : 'text-zinc-800'}`}
      >
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`h-12 p-4 border ${
          errorMessage ? 'border-red-600' : 'border-zinc-300'
        }`}
        required={required}
        {...register(name)}
      />
      {errorMessage && (
        <p className='mt-1 text-sm text-red-600'>{errorMessage}</p>
      )}
    </div>
  );
}
