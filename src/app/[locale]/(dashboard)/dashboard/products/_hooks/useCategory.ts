'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../_api/get-category';

export function useCategory() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
