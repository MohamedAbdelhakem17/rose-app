import React from 'react';
import UpdateForm from './_components/update-form';
import { Product } from '@/lib/types/products/products';
import { getTranslations } from 'next-intl/server';

export default async function Page({ params }: { params: { id: string } }) {
  // Params
  const id = params.id;

  // Translate
  const t = await getTranslations();

  // Fetch
  const response = await fetch(`${process.env.BASE_URL}/products/${id}`);
  const payload: SuccessResponse<{ product: Product }> = await response.json();

  return (
    <div className='mx-7'>
      <h1 className=' text-2xl font-semibold font-inter mt-7 mb-6'>
        {t('dashboard-update-product-form-header')}: {payload.product.title}
      </h1>
      <UpdateForm payload={payload.product} />
    </div>
  );
}
