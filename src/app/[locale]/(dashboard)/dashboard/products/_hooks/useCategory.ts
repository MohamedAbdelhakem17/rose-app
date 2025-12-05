'use client';

import { getCategories } from '@/lib/apis/categories/get-categories';
import { useQuery } from '@tanstack/react-query';

export function useCategory() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
