import { useMutation } from '@tanstack/react-query';
import { subscribeNewsletter } from '@/lib/actions/newsletter.action';

export function useNewsletter() {
  const mutation = useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
  });

  return {
    subscribe: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error as Error | null,
    success: mutation.isSuccess,
  };
}
