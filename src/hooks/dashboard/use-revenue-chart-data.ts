'use client';
import { DailyRevenue } from '@/lib/apis/dashbaord/orders';

export interface RevenueChartItem {
  date: string;
  revenue: number;
  count: number;
}

export function useRevenueChartData(
  data: DailyRevenue[] = []
): RevenueChartItem[] {
  return data.map(item => ({
    date: item._id, // keep as string (YYYY-MM-DD)
    revenue: item.revenue,
    count: item.count,
  }));
}
