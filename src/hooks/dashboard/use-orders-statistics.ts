'use client';

import { getStatistics, StatisticsResponse } from '@/lib/apis/dashbaord/orders';
import { useQuery } from '@tanstack/react-query';

async function fetchStatistics(): Promise<StatisticsResponse> {
  return getStatistics();
}

export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
