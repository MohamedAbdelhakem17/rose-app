import { getReviews } from '@/lib/apis/reviews/reviews.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ReviewResponse } from '@/lib/types/reviews';

/**
 * A hook to fetch reviews for a product by its ID.
 * It uses useSuspenseQuery from @tanstack/react-query
 * to handle the fetching and caching of reviews data.
 * @param {string} [productId] - The id of the product to fetch reviews for.
 * @returns {UseSuspenseQueryResult<ReviewResponse>} - The result of the query.
 */
export function useReviews(productId?: string) {
  return useSuspenseQuery<ReviewResponse>({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId),
  });
}
