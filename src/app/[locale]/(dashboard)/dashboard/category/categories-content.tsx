import { getCategories } from '@/lib/apis/categories/get-categories';
import CategoriesClient from './categories-client';

const PAGE_SIZE = 10;

interface CategoriesContentProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function CategoriesContent({
  searchParams,
}: CategoriesContentProps) {
  const params = await searchParams;
  const searchQuery = params.search || '';
  const currentPage = Number(params.page) || 1;

  try {
    // Fetch with API-level pagination
    const response = await getCategories({
      search: searchQuery,
      page: currentPage,
      limit: PAGE_SIZE,
    });

    // Handle API response format - assumes API returns { categories, total, page, pages, etc. }
    // Adjust based on your actual API response structure
    const categories = response.categories || [];
    const totalPages = response.totalPages || response.pages || 1;

    return (
      <CategoriesClient
        categories={categories}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return (
      <CategoriesClient
        categories={[]}
        totalPages={1}
        searchQuery={searchQuery}
        error='Failed to load categories'
      />
    );
  }
}
