import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createCategoryAction,
  type CreateCategoryInput,
  type CreateCategoryResponse,
} from '@/lib/actions/category.action';
import { useRouter } from '@/i18n/navigation';

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<CreateCategoryResponse, Error, CreateCategoryInput>({
    mutationFn: async (input: CreateCategoryInput) => {
      const result = await createCategoryAction(input);

      if (!result.success) {
        throw new Error(result.error || 'Failed to create category');
      }

      return result;
    },
    onSuccess: data => {
      // Invalidate categories query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });

      // Show success message
      toast.success(data.message || 'Category created successfully');

      // Navigate back to categories list
      router.push('/dashboard/category');
    },
    onError: error => {
      // Show error message
      toast.error(error.message || 'Failed to create category');
      console.error('Create category error:', error);
    },
  });
}
