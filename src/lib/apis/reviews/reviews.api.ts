// src/lib/apis/review/review.api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || '';

export async function getReviews(productId?: string) {
  // ✅ Ensure absolute URL even if BASE_URL is missing or relative
  const base = BASE_URL.startsWith('http')
    ? BASE_URL
    : 'https://flower.elevateegy.com/api/v1';

  const url = productId
    ? `${base}/reviews?product=${productId}`
    : `${base}/reviews`;

  console.log('Fetching:', url);

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
  return res.json();
}
