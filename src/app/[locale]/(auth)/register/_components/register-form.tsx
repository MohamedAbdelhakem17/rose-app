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
import { useTranslations } from 'next-intl';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
// import { PasswordInput } from '@/components/shared/password-input';

export default function RegisterForm() {
  // Translate
  const t = useTranslations();
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
          className='mt-4 py-6 border-t border-b border-zinc-200 flex flex-col gap-4 text-zinc-800 dark:text-white'
        >
          {/* first name */}
          <div className='grid grid-cols-2 gap-4 '>
            <div>
              <label
                className={cn(
                  errors.firstName && 'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('register-first-name-label')}
              </label>
              <FormInput
                name='firstName'
                required
                type='text'
                placeholder='Jonathan'
              />
            </div>

            {/* last name */}
            <div>
              <label
                className={cn(
                  errors.lastName && 'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('register-last-name-label')}
              </label>
              <FormInput
                name='lastName'
                required
                type='text'
                placeholder='Adrian'
              />
            </div>
          </div>

          {/* email */}
          <label
            className={cn(
              errors.email && 'text-red-500 dark:text-soft-pink-700'
            )}
          >
            {' '}
            {t('register-email-label')}
          </label>
          <FormInput
            name='email'
            required
            type='email'
            placeholder='user@example.com'
          />
          {/* phone */}
          <label
            className={cn(
              errors.phone && 'text-red-500 dark:text-soft-pink-700'
            )}
          >
            {' '}
            {t('register-phone-label')}
          </label>
          <FormInput
            label='Phone'
            name='phone'
            required
            type='tel'
            placeholder='+20123456789'
          />

          {/* Gender */}
          <div>
            <label
              className={cn(
                'block text-sm font-medium mb-1.5',
                errors.gender && 'text-red-500 dark:text-soft-pink-700'
              )}
            >
              {t('register-gender-label')}
            </label>
            <Select onValueChange={value => setValue('gender', value)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={t('register-gender-placeholder')} />
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
          <label
            className={cn(
              errors.password && 'text-red-500 dark:text-soft-pink-700'
            )}
          >
            {t('register-password-label')}
          </label>
          <PasswordInput name='password' required placeholder='Your password' />

          {/* re-password */}
          <label
            className={cn(
              errors.rePassword && 'text-red-500 dark:text-soft-pink-700'
            )}
          >
            {t('register-confirm-password-label')}
          </label>
          <PasswordInput
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
            {isPending ? (
              <Loader2Icon className='animate-spin w-6 h-6 mx-auto' />
            ) : (
              t('register-button')
            )}
          </Button>
        </form>
      </FormProvider>
      <div className='mt-5'>
        <p className='text-center text-zinc-800 dark:text-white font-medium text-sm'>
          {t('register-p')}{' '}
          <Link
            href='/login'
            className='font-bold text-maroon-700 dark:text-soft-pink-300'
          >
            {t('register-p-active')}
          </Link>
        </p>
      </div>
    </>
  );
}
