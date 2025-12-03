import { Suspense } from 'react';
import CategorySkeleton from './category-skeleton';
import CategoriesContent from './categories-content';

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function CategoriesPage(props: PageProps) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      {/* @ts-expect-error Async Server Component */}
      <CategoriesContent searchParams={props.searchParams} />
    </Suspense>
  );
}
