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
  occasionEditSchema,
  OccasionEditSchemaType,
} from '@/lib/schemas/auth/dashboard/occasion.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useEditOccasion from './../../_hooks/use-edit-occasion';
import ImageDialogView from './image-dialog-view';

export default function OccasionEditForm({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: string;
}) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Mutation
  const { editOccasion, isPending } = useEditOccasion();

  // Form and Validation
  const form = useForm<OccasionEditSchemaType>({
    resolver: zodResolver(occasionEditSchema),
    defaultValues: {
      name: name,
    },
  });

  // Functions
  const onSubmit = async (values: OccasionEditSchemaType) => {
    const formData = new FormData();
    formData.append('name', values.name);

    editOccasion(
      { id, data: formData },
      {
        onSuccess: () => {
          // Add successfully
          toast.success(t('occasion-added-successfully-message'), {
            duration: 800,
          });

          // Navigate to occasions list
          setTimeout(() => {
            router.push('/dashboard/occasions');
          }, 1000);

          router.refresh();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          toast.error(err?.message || 'Something went wrong!');
        },
      }
    );
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
          <ImageDialogView imageUrl={image} />
          {/* Submit */}
          <Button
            type='submit'
            className='w-full !mt-16'
            disabled={(isSubmitted && !isValid) || isPending}
            loading={isPending}
            loadingText={'Updating..'}
          >
            Update Occasion
          </Button>
        </form>
      </Form>
    </section>
  );
}
