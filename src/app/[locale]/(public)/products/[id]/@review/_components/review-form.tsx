'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/lib/utils/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddReview } from '@/lib/types/review';
import { useParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import StarRating from '../../../_components/ratings/star-rating';
import addReview from '../_actions/add-review';
import { useLocale, useTranslations } from 'next-intl';

type ReviewFormProps = {
  className?: string;
};
export default function ReviewForm({ className }: ReviewFormProps) {
  //Local
  const local = useLocale();

  // Variables
  const { id } = useParams();

  // Translate
  const t = useTranslations();

  // Form
  const form = useForm<AddReview>({
    defaultValues: {
      product: id,
      rating: 0,
      title: '',
      comment: '',
    },
  });

  // Functions
  const onSubmit: SubmitHandler<AddReview> = async values => {
    const body = {
      rating: values.rating,
      comment: values.comment,
      title: values.title,
      product: values.product,
    };
    addReview(body);
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          'relative flex flex-col gap-3 mt-4 first-letter:uppercase ',
          local === 'ar'
            ? 'pr-5 border-r border-r-zinc-200 dark:border-r-zinc-700'
            : 'pl-5 border-l border-l-zinc-200 dark:border-l-zinc-700',
          'capitalize font-inter font-medium w-[404px]',
          className
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Rating */}
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className='text-gray-800 dark:text-white'>
                {t('rating-form-your-rating')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <StarRating
                  max={5}
                  value={field.value}
                  onChange={value => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className='text-gray-800 dark:text-white'>
                {t('rating-form-title')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  placeholder={t('rating-form-title-placeholder')}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          name='comment'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className='text-gray-800 dark:text-white'>
                {t('rating-form-comment')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  className=' h-40'
                  placeholder={t('rating-form-comment-placeholder')}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type='submit'
          variant={'primary'}
          disabled={form.formState.isSubmitting}
          className='capitalize font-sarabun w-full'
        >
          {t('rating-button')}
        </Button>
      </form>
    </Form>
  );
}
