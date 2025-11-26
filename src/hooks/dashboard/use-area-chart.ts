import {
  AreaChartStatisticsResponse,
  getAreaChartStatistics,
} from '@/lib/apis/dashbaord/area-chart';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { DailyRevenueItem } from '@/lib/apis/dashbaord/area-chart';

export function useAreaChartStatistics() {
  return useQuery<AreaChartStatisticsResponse>({
    queryKey: ['area-chart-statistics'],
    queryFn: getAreaChartStatistics,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

export function useAreaRevenueData(
  dailyRevenue: DailyRevenueItem[] | undefined
) {
  return useMemo(() => {
    if (!dailyRevenue) return [];

    // Add any transformations here if needed
    return dailyRevenue;
  }, [dailyRevenue]);
}
