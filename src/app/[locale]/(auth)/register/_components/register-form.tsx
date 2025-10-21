'use client';
import FormInput from '@/components/shared/form-input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RegisterFormData,
  registerSchema,
} from '@/lib/schemas/auth/register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRegister } from '../_hooks/use-register';
import { PasswordInput } from './register-form-password-input';
// import { PasswordInput } from '@/components/shared/password-input';

export default function RegisterForm() {
  //react query mutation hook
  const { isPending, signUp } = useRegister();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      gender: '',
    },
  });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: RegisterFormData) => {
    await signUp(data, {
      onSuccess: () => {
        toast.success('Registration successful!');
      },
      onError: (error: Error) => {
        toast.error(`Registration failed! ${error.message}`);
      },
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className='mt-4 py-6 border-t border-b border-zinc-200 flex flex-col gap-4'
        >
          {/* first name */}
          <div className='grid grid-cols-2 gap-4'>
            <FormInput
              label='First Name'
              name='firstName'
              required
              type='text'
              placeholder='Jonathan'
            />

            {/* last name */}
            <FormInput
              label='Last name'
              name='lastName'
              required
              type='text'
              placeholder='Adrian'
            />
          </div>

          {/* email */}
          <FormInput
            label='Email'
            name='email'
            required
            type='email'
            placeholder='user@example.com'
          />
          {/* phone */}
          <FormInput
            label='Phone'
            name='phone'
            required
            type='tel'
            placeholder='+20123456789'
          />

          {/* Gender */}
          <div>
            <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
              Gender
            </label>
            <Select onValueChange={value => setValue('gender', value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select Gender' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='male'>Male</SelectItem>
                <SelectItem value='female'>Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.gender.message}
              </p>
            )}
          </div>
          {/* password */}
          <PasswordInput
            label='Password'
            name='password'
            required
            placeholder='Your password'
          />

          {/* re-password */}
          <PasswordInput
            label='Confirm Password'
            name='rePassword'
            required
            placeholder='Confirm your password'
          />

          {/* button */}
          <Button
            type='submit'
            disabled={isPending}
            className='mt-4 mb-3 w-full bg-maroon-700 text-white py-2 px-4 rounded-md hover:bg-maroon-800 transition-colors'
          >
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </FormProvider>
      <div className='mt-5'>
        <p className='text-center text-zinc-800 font-medium text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='font-bold'>
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
