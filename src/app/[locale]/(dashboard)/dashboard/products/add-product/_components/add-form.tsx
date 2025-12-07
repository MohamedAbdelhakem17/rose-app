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
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AddProductForm,
  addProductSchema,
} from '@/lib/schemas/dashboard/products.schema';
import { cn } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import addProduct from '../../_action/add-product.action';
import { useCategory } from '../../_hooks/useCategory';
import { useOccasion } from '../../_hooks/useOccasion';
import { toFormData } from '../../lib/utils/toFormData';
export default function AddForm() {
  // Translate
  const t = useTranslations();
  // Form
  const form = useForm<AddProductForm>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discount: '',
      priceAfterDiscount: '',
      quantity: '',
      productCoverImage: '',
      productGallery: [''],
      category: '',
      occasion: '',
    },
    resolver: zodResolver(addProductSchema),
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

  // Function
  async function handleSubmit(values: AddProductForm) {
    const formData = toFormData(values);
    // Mutation;
    addProduct(formData);
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
              <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                {t('dashboard-add-product-form-title-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='text'
                  placeholder={t(
                    'dashboard-add-product-form-title-placeholder'
                  )}
                  className={cn(
                    form.formState.errors.title?.message &&
                      'border-red-600 focus:ring-red-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
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
              <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                {t('dashboard-add-product-form-description-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Textarea
                  placeholder={t(
                    'dashboard-add-product-form-description-placeholder'
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
              <FormMessage />
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
                <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                  {t('dashboard-add-product-form-price-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t(
                      'dashboard-add-product-form-price-placeholder'
                    )}
                    className={cn(
                      form.formState.errors.title?.message &&
                        'border-red-600 focus:ring-red-600'
                    )}
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
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
                  {t('dashboard-add-product-form-discount-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    placeholder={t(
                      'dashboard-add-product-form-discount-placeholder'
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
                <FormLabel className='first-letter:uppercase'>
                  {t('dashboard-add-product-form-price-after-discount-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='number'
                    disabled
                    placeholder={t(
                      'dashboard-add-product-form-price-after-discount-placeholder'
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
              <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                {t('dashboard-add-product-form-quantity-label')}
              </FormLabel>

              {/* Field */}
              <FormControl>
                <Input
                  type='number'
                  min={1}
                  placeholder={t(
                    'dashboard-add-product-form-quantity-placeholder'
                  )}
                  className={cn(
                    form.formState.errors.title?.message &&
                      'border-red-600 focus:ring-red-600'
                  )}
                  {...field}
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Group */}
        <div className=' flex justify-start items-start gap-2.5 w-full'>
          {/* Product Cover Image */}
          <FormField
            name='productCoverImage'
            control={form.control}
            render={({ field }) => (
              <FormItem className=' w-full'>
                {/* Label */}
                <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                  {t('dashboard-add-product-form-product-cover-image-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input
                    type='file'
                    className={cn(
                      form.formState.errors.title?.message &&
                        'border-red-600 focus:ring-red-600'
                    )}
                    {...field}
                  />
                </FormControl>

                {/* Feedback */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Product Gallery */}
          <FormField
            name='productGallery'
            control={form.control}
            render={({ field }) => (
              <FormItem className=' w-full'>
                {/* Label */}
                <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                  {t('dashboard-add-product-form-product-gallery-label')}
                </FormLabel>

                {/* Field */}
                <FormControl>
                  <Input type='file' multiple accept='image/*' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Category */}
        <FormField
          name='category'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' flex flex-col w-full'>
              {/* Label */}
              <FormLabel className='first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                {t('dashboard-add-product-form-category-label')}
              </FormLabel>

              {/* Select */}
              <Select onValueChange={field.onChange} value={field.value}>
                {/* Trigger */}
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(
                      'dashboard-add-product-form-category-placeholder'
                    )}
                  />
                </SelectTrigger>

                {/* Content */}
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

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Occasion */}
        <FormField
          name='occasion'
          control={form.control}
          render={({ field }) => (
            <FormItem className=' flex flex-col w-full'>
              {/* Label */}
              <FormLabel className=' first-letter:uppercase after:content-["*"] after:text-red-600 after:ml-0.5'>
                {t('dashboard-add-product-form-occasion-label')}
              </FormLabel>

              {/* Select */}
              <Select onValueChange={field.onChange} value={field.value}>
                {/* Trigger */}
                <SelectTrigger>
                  <SelectValue
                    placeholder={t(
                      'dashboard-add-product-form-occasion-placeholder'
                    )}
                  />
                </SelectTrigger>

                {/* Content */}
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

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <Button
          type='submit'
          className='first-letter:uppercase w-full mt-28 mb-6'
          disabled={form.formState.isSubmitting}
        >
          {t('dashboard-add-product-form-button')}
        </Button>
      </form>
    </Form>
  );
}
