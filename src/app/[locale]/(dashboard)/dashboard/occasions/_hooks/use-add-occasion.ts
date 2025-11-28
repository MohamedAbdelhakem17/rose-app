'use client';
import { addNewOccasionsAction } from '@/lib/actions/dashboard/occasions.action';
import { useMutation } from '@tanstack/react-query';

const useAddOccasion = () => {
  const {
    mutate: addOccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['add-occasion'],

    mutationFn: async (payload: FormData) => {
      const data = await addNewOccasionsAction(payload);

      console.log(data);
      return data;
    },
  });

  return { addOccasion, error, isPending };
};

export default useAddOccasion;
