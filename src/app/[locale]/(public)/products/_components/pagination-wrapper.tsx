'use client';

import Pagination from '@/components/shared/pagination';

export default function PaginationWrapper({
  totalPages,
}: {
  totalPages: number;
}) {
  return <Pagination totalPages={totalPages} />;
}
