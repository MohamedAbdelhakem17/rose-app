export async function getCategories() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`https://flower.elevateegy.com/api/v1/categories`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}
