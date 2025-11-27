'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  deleteCategoryAction,
  type DeleteCategoryInput,
  type CreateCategoryResponse,
} from '@/lib/actions/category.action';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation<CreateCategoryResponse, Error, DeleteCategoryInput>({
    mutationFn: async (input: DeleteCategoryInput) => {
      const result = await deleteCategoryAction(input);

      if (!result.success) {
        throw new Error(result.error || 'Failed to delete category');
      }

      return result;
    },
    onSuccess: data => {
      // Invalidate categories query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      // Show success message
      toast.success(data.message || 'Category deleted successfully');
    },
    onError: error => {
      // Show error message
      toast.error(error.message || 'Failed to delete category');
    },
  });
}
