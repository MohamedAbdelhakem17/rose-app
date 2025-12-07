import { useQuery } from '@tanstack/react-query';
import { getOccasion } from '../_api/get-occasion';

export function useOccasion() {
  return useQuery({
    queryKey: ['occasion'],
    queryFn: getOccasion,
  });
}
