export async function getCategories() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseURL}/api/v1/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch categories');

  const data = await res.json(); // ✅ await this
  return data; // now returns actual JSON, not a Promise
}
