'use client';

import { Input } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
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
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRegister } from '../_hooks/use-register';
// import { PasswordInput } from '@/components/shared/password-input';

export default function RegisterForm() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { isPending, signUp } = useRegister();

  // Form and Validation
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      gender: 'male',
    },
  });

  // Variables
  const { isSubmitting, errors } = form.formState;

  // Functions
  const onSubmit = async (data: RegisterFormData) => {
    console.log(data, 'data');
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
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-4 py-2 grid grid-cols-2 gap-4'
        >
          {/* First Name */}
          <FormField
            name='firstName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstname-label')}</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={t('first-name-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            name='lastName'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastname-label')}</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder={t('last-name-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            name='email'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel>{t('email-label')}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='user@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='col-span-full'>
                {/* Label */}
                <FormLabel>Phone</FormLabel>

                {/* Field */}
                <FormControl>
                  <PhoneInput
                    type='text'
                    placeholder='01012345678'
                    error={!!errors.phone}
                    {...field}
                  />
                </FormControl>
                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            name='gender'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel>{t('gender-label')}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select-gender')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>{t('male')}</SelectItem>
                      <SelectItem value='female'>{t('female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            name='password'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel>{t('password-label')}</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='*******' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            name='rePassword'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-full'>
                <FormLabel>{t('repassword-label')}</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='*******' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isPending || isSubmitting}
            className='mt-4 mb-3 col-span-full bg-maroon-700 text-white py-2 px-4 rounded-md hover:bg-maroon-800 transition-colors'
          >
            {isPending ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </>
  );
}
