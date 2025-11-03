'use client';

import { useParams } from 'next/navigation';

import ProductReview from './review-server';
import { useReviews } from './_hooks/use-reviews';

export default function ProductReviewClient() {
  const { product_id } = useParams();
  const { data } = useReviews(product_id as string);

  if (!data) return null;

  return <ProductReview data={data} />;
}
