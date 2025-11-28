'use client';

import { deleteOccasionsAction } from '@/lib/actions/dashboard/occasions.action';
import { useMutation } from '@tanstack/react-query';

const useDeleteOccasion = () => {
  const {
    mutate: deleteOccasion,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['delete-occasion'],

    mutationFn: async (id: string) => {
      const data = await deleteOccasionsAction(id);
      return data;
    },
  });

  return { deleteOccasion, isPending, error };
};

export default useDeleteOccasion;
