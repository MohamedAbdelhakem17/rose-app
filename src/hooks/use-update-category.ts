'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  updateCategoryAction,
  type UpdateCategoryInput,
  type CreateCategoryResponse,
} from '@/lib/actions/category.action';
import { useRouter } from '@/i18n/navigation';

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CreateCategoryResponse, Error, UpdateCategoryInput>({
    mutationFn: async (input: UpdateCategoryInput) => {
      const result = await updateCategoryAction(input);

      if (!result.success) {
        throw new Error(result.error || 'Failed to update category');
      }

      return result;
    },
    onSuccess: data => {
      // Invalidate categories query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      // Show success message
      toast.success(data.message || 'Category updated successfully');

      // Navigate back to categories list
      router.push('/dashboard/category');
    },
    onError: error => {
      // Show error message
      toast.error(error.message || 'Failed to update category');
      console.error('Update category error:', error);
    },
  });
}
