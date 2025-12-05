'use client';

import { Input } from '@/components/shared';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AddProductForm } from '@/lib/schemas/dashboard/products.schema';
import { cn } from '@/lib/utils/utils';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCategory } from '../../../_hooks/useCategory';
import { useOccasion } from '../../../_hooks/useOccasion';
import { toFormData } from '../../../lib/utils/toFormData';
import updateProduct from '../../../_action/update-product.action';
import { Product } from '@/lib/types/products/products';
import { Image, Images } from 'lucide-react';

type UpdateFormPros = {
  payload: Product;
};
export default function UpdateForm({ payload }: UpdateFormPros) {
  // Translate
  const t = useTranslations();

  // Locale
  const locale = useLocale();
  // Form
  const form = useForm<AddProductForm>({
    defaultValues: {
      title: payload.title,
      description: payload.description,
      price: `${payload.price}`,
      discount: `${payload.price - (payload.priceAfterDiscount * 100) / payload.price} `,
      priceAfterDiscount: `${payload.priceAfterDiscount}`,
      quantity: `${payload.quantity}`,
      productCoverImage: '',
      productGallery: [''],
      category: '',
      occasion: '',
    },
  });

  // Custom Hook
  // Category Hook
  const { data: categoryPayload, isLoading: isCategoryLoading } = useCategory();

  // Occasion Hook
  const { data: occasionPayload, isLoading: isOccasionLoading } = useOccasion();

  // Variables
  const price = form.watch('price');
  const discount = form.watch('discount');

  // useEffect
  useEffect(() => {
    const priceNum = Number(price);
    const discountNum = Number(discount);
    const calculatePrice = priceNum - (priceNum * discountNum) / 100;
    form.setValue('priceAfterDiscount', calculatePrice.toString());
  }, [price, discount]);

  useEffect(() => {
    form.reset({
      title: payload.title,
      description: payload.description,
      price: `${payload.price}`,
      discount: `${payload.price - (payload.priceAfterDiscount * 100) / payload.price} `,
      priceAfterDiscount: `${payload.priceAfterDiscount}`,
      quantity: `${payload.quantity}`,
      productCoverImage: '',
      productGallery: [''],
      category: payload.category ?? '',
      occasion: payload.occasion ?? '',
    });
  }, [payload]);

  // Function
  async function handleSubmit(values: AddProductForm) {
    const formData = toFormData(values);
    // Mutation;
    updateProduct(payload._id, formData);
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-center items-start gap-5 max-w-[740px]'
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* Title */}
        <FormField
          name='title'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' w-full'>
              {/* Label */}
              <FormLabel className='first-letter:uppercase'>
                {t('dashboard-update-product-form-title-label')}
                <span className=' text-red-600'>*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  className={cn(
                    form.formState.errors.title?.message &&
                      'border-red-600 focus:ring-red-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' w-full'>
              {/* Label */}
              <FormLabel className='first-letter:uppercase'>
                {t('dashboard-update-product-form-description-label')}
                <span className=' text-red-600'>*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  placeholder={t(
                    'dashboard-update-product-form-description-placeholder'
                  )}
                  className={cn(
                    'max-h-96 min-h-28',
                    form.formState.errors.title?.message &&
                      'border-red-600 focus:ring-red-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
            </FormItem>
          )}
        />

        {/* Price Group */}
        <div className=' flex justify-start items-start gap-2.5 w-full'>
          {/* Price */}
          <FormField
            name='price'
            control={form.control}
            render={({ field }) => (
              <FormItem className=' w-full'>
                {/* Label */}
                <FormLabel className='first-letter:uppercase'>
                  {t('dashboard-update-product-form-price-label')}
                  <span className=' text-red-600'>*</span>
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t(
                      'dashboard-update-product-form-price-placeholder'
                    )}
                    className={cn(
                      form.formState.errors.title?.message &&
                        'border-red-600 focus:ring-red-600'
                    )}
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            name='discount'
            control={form.control}
            render={({ field }) => (
              <FormItem className=' w-full'>
                {/* Label */}
                <FormLabel className='first-letter:uppercase'>
                  {t('dashboard-update-product-form-discount-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t(
                      'dashboard-update-product-form-discount-placeholder'
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Price After Discount */}
          <FormField
            name='priceAfterDiscount'
            control={form.control}
            render={({ field }) => (
              <FormItem className=' w-full'>
                {/* Label */}
                <label
                  htmlFor='priceAfterDiscount'
                  className='first-letter:uppercase text-sm'
                >
                  {t(
                    'dashboard-update-product-form-price-after-discount-label'
                  )}
                </label>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    disabled
                    placeholder={t(
                      'dashboard-update-product-form-price-after-discount-placeholder'
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Quantity */}
        <FormField
          name='quantity'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              {/* Label */}
              <FormLabel className='first-letter:uppercase'>
                {t('dashboard-update-product-form-quantity-label')}
                <span className=' text-red-600'>*</span>
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='number'
                  placeholder={t(
                    'dashboard-update-product-form-quantity-placeholder'
                  )}
                  className={cn(
                    form.formState.errors.title?.message &&
                      'border-red-600 focus:ring-red-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          name='category'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' flex flex-col w-full'>
              <FormLabel>
                {t('dashboard-update-product-form-category-label')}
                <span className=' text-red-600'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(
                      'dashboard-update-product-form-category-placeholder'
                    )}
                  />
                </SelectTrigger>
                {isCategoryLoading ? (
                  <SelectContent>
                    <p>...Loading</p>
                  </SelectContent>
                ) : (
                  <SelectContent>
                    {categoryPayload?.categories.map(({ _id, name }) => (
                      <SelectItem key={_id} value={_id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
            </FormItem>
          )}
        />

        {/* Occasion */}
        <FormField
          name='occasion'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' flex flex-col w-full'>
              <FormLabel>
                {t('dashboard-update-product-form-occasion-label')}
                <span className=' text-red-600'>*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(
                      'dashboard-update-product-form-occasion-placeholder'
                    )}
                  />
                </SelectTrigger>
                {isOccasionLoading ? (
                  <SelectContent>
                    <p>...Loading</p>
                  </SelectContent>
                ) : (
                  <SelectContent>
                    {occasionPayload?.occasions?.map(({ _id, name }) => (
                      <SelectItem key={_id} value={_id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
            </FormItem>
          )}
        />

        <div
          className={cn(
            'flex items-center gap-2.5 w-full',
            locale === 'ar' ? 'justify-start' : 'justify-end '
          )}
        >
          <div className=' flex justify-start items-center rounded-lg p-2 text-blue-600 border border-zinc-400 cursor-pointer gap-2'>
            <Image />
            <p>
              {t('dashboard-update-product-form-product-cover-image-label')}
            </p>
          </div>

          <div className=' flex justify-start items-center rounded-lg p-2 text-blue-600 border border-zinc-400 cursor-pointer gap-2'>
            <Images />
            <p>{t('dashboard-update-product-form-product-gallery-label')}</p>
          </div>
        </div>

        {/* Button */}
        <Button
          type='submit'
          className='first-letter:uppercase w-full mt-28 mb-6'
          disabled={form.formState.isSubmitting}
        >
          {t('dashboard-update-product-form-button')}
        </Button>
      </form>
    </Form>
  );
}
