import React from 'react';
import UpdateForm from './_components/update-form';
import { Product } from '@/lib/types/products/products';
import { getTranslations } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: { 'product-id': string };
}) {
  // Params
  const productId = params['product-id'];

  // Translate
  const t = await getTranslations();

  // Fetch
  const response = await fetch(`${process.env.BASE_URL}/products/${productId}`);
  const payload: SuccessResponse<Product> = await response.json();
  console.log(payload);

  return (
    <div className='mx-7'>
      <h1 className=' text-2xl font-semibold font-inter mt-7 mb-6'>
        {t('dashboard-update-product-form-header')}: {payload.product.title}
      </h1>
      <UpdateForm payload={payload.product} />
    </div>
  );
}
