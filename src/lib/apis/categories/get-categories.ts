export async function getCategories(searchQuery?: string) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Build URL with search query parameter if provided
  const url = new URL(`${baseURL}/api/v1/categories`);
  if (searchQuery && searchQuery.trim()) {
    url.searchParams.append('search', searchQuery.trim());
  }

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  const data = await res.json();
  return data;
}
