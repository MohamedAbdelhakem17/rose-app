import { Textarea } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';

import { StepState } from '@/lib/types/modal/step-state';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormUpdateModalProps = {
  setStep: (_step: StepState) => void;
};
export default function FormUpdateModal({ setStep }: FormUpdateModalProps) {
  // Translate
  const t = useTranslations();

  // Form
  const form = useForm<UpdateModal>({
    defaultValues: {
      city: '',
      address: '',
      phone: '',
    },
  });

  // Functions
  function handelSubmit(value: UpdateModal) {
    const data = {
      city: value.city,
      address: value.address,
      phone: value.phone,
    };

    // Save data in local storage
      localStorage.setItem('update-modal', JSON.stringify(data)); 

    // Next step
    setStep('map');
  }

  return (
    <Form {...form}>
      <form
        className=' flex flex-col justify-center gap-2'
        onSubmit={form.handleSubmit(handelSubmit)}
      >
        {/* City */}
        <FormField
          name='city'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel
                className={cn(
                  'text-gray-800 dark:text-white',
                  form.formState.errors.city &&
                    'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('update-modal-form-city-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  placeholder={t('update-modal-form-city-placeholder')}
                  className={cn(
                    'placeholder:text-zinc-400',
                    form.formState.errors.city?.message &&
                      'border-red-600 dark:border-soft-pink-500 focus:ring-red-600 dark:focus:ring-soft-pink-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          name='address'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel
                className={cn(
                  'text-gray-800 dark:text-white',
                  form.formState.errors.address &&
                    'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('update-modal-form-address-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  placeholder={t('update-modal-form-address-placeholder')}
                  className={cn(
                    ' h-40 placeholder:text-zinc-400',
                    form.formState.errors.address?.message &&
                      'border-red-600 dark:border-soft-pink-500 focus:ring-red-600 dark:focus:ring-soft-pink-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name='phone'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel
                className={cn(
                  'text-gray-800 dark:text-white',
                  form.formState.errors.phone &&
                    'text-red-500 dark:text-soft-pink-700'
                )}
              >
                {t('update-modal-form-phone-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  placeholder={t('update-modal-form-phone-placeholder')}
                  className={cn(
                    'placeholder:text-zinc-400',
                    form.formState.errors.phone?.message &&
                      'border-red-600 dark:border-soft-pink-500 focus:ring-red-600 dark:focus:ring-soft-pink-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <Button className=' w-full mt-11'>
          {t('update-modal-form-button')}
        </Button>
      </form>
    </Form>
  );
}
