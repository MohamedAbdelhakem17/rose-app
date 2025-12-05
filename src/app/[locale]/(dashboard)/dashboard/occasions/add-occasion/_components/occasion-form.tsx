'use client';

import { Input } from '@/components/shared/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  occasionSchema,
  OccasionSchemaType,
} from '@/lib/schemas/auth/dashboard/occasion.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useAddOccasion from './../../_hooks/use-add-occasion';

export default function OccasionForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [preview, setPreview] = useState<string | null>(null);

  // Mutation
  const { addOccasion, isPending } = useAddOccasion();

  // Form and Validation
  const form = useForm<OccasionSchemaType>({
    resolver: zodResolver(occasionSchema),
    defaultValues: {
      name: '',
      image: undefined,
    },
  });

  // Functions
  const onSubmit = async (values: OccasionSchemaType) => {
    if (!values.image) {
      return toast.error('Image is required!');
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image);

    addOccasion(formData, {
      onSuccess: () => {
        // Add successfully
        toast.success(t('occasion-added-successfully-message'), {
          duration: 800,
        });

        // Navigate to occasions list
        setTimeout(() => {
          router.push('/dashboard/occasions');
        }, 1000);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.message || 'Something went wrong!');
      },
    });
  };

  // Variables
  const { isValid, isSubmitted } = form.formState;
  return (
    <section className='bg-white p-6'>
      <Form {...form}>
        <form
          className='rounded-lg max-w-3xl space-y-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Name */}
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="after:content-['*'] after:text-red-500 after:ms-1">
                  {t('occasion-name')}
                </FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter occasion name'
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image */}
          <FormField
            name='image'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                {/* Label */}
                <FormLabel className="after:content-['*'] after:text-red-500 after:ms-1">
                  {t('occasion-image')}
                </FormLabel>

                {/* Input */}
                <FormControl>
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Preview */}
          {preview && (
            <div className='mt-4'>
              <Image
                src={preview}
                alt='Preview'
                width={200}
                height={200}
                className='rounded-md border'
              />
            </div>
          )}

          {/* Submit */}
          <Button
            type='submit'
            className='w-full !mt-16'
            disabled={(isSubmitted && !isValid) || isPending}
            loading={isPending}
            loadingText={t('adding')}
          >
            {t('add-occasion')}
          </Button>
        </form>
      </Form>
    </section>
  );
}
