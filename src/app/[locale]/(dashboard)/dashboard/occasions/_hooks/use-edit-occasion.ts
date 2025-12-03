'use client';
import { updateOccasionsAction } from '@/lib/actions/dashboard/occasions.action';
import { useMutation } from '@tanstack/react-query';

type EditPayload = {
  id: string;
  data: FormData;
};

const useEditOccasion = () => {
  const {
    mutate: editOccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['edit-occasion'],

    mutationFn: async ({ id, data }: EditPayload) => {
      const result = await updateOccasionsAction({ id, dataPayload: data });

      return result;
    },
  });

  return { editOccasion, error, isPending };
};

export default useEditOccasion;
