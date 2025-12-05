import Pagination from '@/components/shared/pagination';

interface CategoriesPaginationProps {
  totalPages: number;
}

export default function CategoriesPagination({
  totalPages,
}: CategoriesPaginationProps) {
  return <Pagination totalPages={totalPages} pathname='category' />;
}
