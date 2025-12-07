import React from 'react';
import ProductHeader from './_components/product-header';
import SearchInput from './_components/search-input';
import ProductList from './_components/product-list';
import Pagination from '@/components/shared/pagination';
import { getProducts } from '@/lib/apis/dashbaord/products';

interface Iprops {
  searchParams?: { search?: string; page?: string };
}

export default async function Page({ searchParams }: Iprops) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const search = searchParams?.search || '';

  // Fetch products data from the API
  const { data, error } = await getProducts(page, search);

  if (error || !data) {
    return (
      <section className='p-5 w-full bg-slate-50'>
        <div className=' bg-white rounded-lg p-6 min-h-[938px] flex flex-col gap-4'>
          <ProductHeader />
          <SearchInput />
          <p className='text-red-500'>Error: {error}</p>
        </div>
      </section>
    );
  }
  const { products, metadata } = data;
  return (
    <section className='p-5 w-full bg-slate-50'>
      <div className=' bg-white rounded-lg p-6 min-h-[938px] flex flex-col gap-4'>
        <ProductHeader />
        <SearchInput />
        <ProductList products={products} />
      </div>
      <div>
        <Pagination
          pathname='/dashboard/products'
          totalPages={metadata.totalPages}
        />
      </div>
    </section>
  );
}
