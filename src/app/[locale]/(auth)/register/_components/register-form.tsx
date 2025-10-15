'use client';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/components/shared';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterFormData,
  registerSchema,
} from '@/lib/schemas/auth/register-schema';
import { useRegister } from '../_hooks/use-register';

export default function RegisterForm() {
  //react query mutation hook
  const{ isPending, error, signUp } = useRegister();

  const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm<RegisterFormData>({
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

  const  onSubmit =  async (data: RegisterFormData) => {
    await signUp(data,{
      onSuccess: (data) => {
        console.log('Registration successful:', data);
        // You can redirect the user or show a success message here
      },
      onError: (error: Error) => {
        console.error('Registration failed:', error.message);
        // You can show an error message to the user here
      },
    });
  }

  const form = useForm<RegisterFormData>();
  console.log(form);
  return (
    <>
      <form className='mt-4 py-6 border-t border-b border-zinc-200 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-5 '>
          {/* first name and last name  */}
          <div className=''>
            <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
              First Name
            </label>
            <Input
              type='text'
              className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
              placeholder='John'
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className=''>
            <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
              Last Name
            </label>
            <Input
              type='text'
              className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
              placeholder='Doe'
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* email */}
        <div className=''>
          <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
            Email
          </label>
          <Input
            type='email'
            className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
            placeholder='John'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
          )}
        </div>
        {/* phone */}
        <div className=''>
          <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
            Phone
          </label>
          <Input
            type='tel'
            className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
            placeholder='John'
            {...register('phone')}
          />
          {errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
          )}
        </div>
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
            <p className='text-red-500 text-sm mt-1'>{errors.gender.message}</p>
          )}
        </div>
        {/* password and confirm password */}
        <div className=''>
          <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
            Password
          </label>
          <Input
            type='password'
            className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
            placeholder='John'
            {...register('password')}

          />
          {errors.password && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.password.message}
            </p>
          )}  
        </div>
        <div className=''>
          <label className='block text-sm font-medium text-zinc-800 mb-1.5'>
            Confirm Password
          </label>
          <Input
            type='password'
            className='w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary'
            placeholder='John'
            {...register('rePassword')}
          />
          {errors.rePassword && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.rePassword.message}
            </p>
          )}
        </div>
        {/* button */}
        <Button
          type='submit'
          className='mt-4 mb-3 w-full bg-maroon-700 text-white py-2 px-4 rounded-md hover:bg-maroon-800 transition-colors'
        >
          {isPending ? 'Registering...' : 'Register'}
        </Button>
      </form>
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
