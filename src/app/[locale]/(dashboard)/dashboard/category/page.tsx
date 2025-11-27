import { Suspense } from 'react';
import { getCategories } from '@/lib/apis/categories/get-categories';
import CategoriesClient from './categories-client';

const PAGE_SIZE = 10;

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function CategoriesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.search || '';
  const currentPage = Number(searchParams.page) || 1;

  try {
    const { categories } = await getCategories(searchQuery);
    const totalPages = Math.max(
      1,
      Math.ceil((categories || []).length / PAGE_SIZE)
    );

    const start = (currentPage - 1) * PAGE_SIZE;
    const paginatedCategories = (categories || []).slice(
      start,
      start + PAGE_SIZE
    );

    return (
      <Suspense
        fallback={
          <div className='bg-gray-50 min-h-screen px-10 py-8'>Loading...</div>
        }
      >
        <CategoriesClient
          initialCategories={paginatedCategories}
          totalPages={totalPages}
          totalCategories={categories || []}
          initialSearch={searchQuery}
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return (
      <Suspense
        fallback={
          <div className='bg-gray-50 min-h-screen px-10 py-8'>Loading...</div>
        }
      >
        <CategoriesClient
          initialCategories={[]}
          totalPages={1}
          totalCategories={[]}
          initialSearch={searchQuery}
          error='Failed to load categories'
        />
      </Suspense>
    );
  }
}
