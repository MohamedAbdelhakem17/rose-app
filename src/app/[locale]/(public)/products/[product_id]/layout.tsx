import { ReviewSkeleton } from '@/components/skeleton';
import React, { Suspense } from 'react';

type LayoutProps = {
  related: React.ReactNode;
  review: React.ReactNode;
  children: React.ReactNode;
};

export default function Layout({ related, review, children }: LayoutProps) {
  return (
    <>
      {children}

      <Suspense fallback={<ReviewSkeleton />}>{review}</Suspense>

      {related}
    </>
  );
}
