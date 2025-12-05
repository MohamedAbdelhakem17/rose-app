interface GetCategoriesOptions {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getCategories(options: GetCategoriesOptions = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { search, page = 1, limit = 10 } = options;

  // Build URL with query parameters
  const url = new URL(`${baseURL}/api/v1/categories`);
  if (search && search.trim()) {
    url.searchParams.append('search', search.trim());
  }
  url.searchParams.append('page', String(page));
  url.searchParams.append('limit', String(limit));

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  const data = await res.json();
  return data;
}
