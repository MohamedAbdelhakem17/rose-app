import { getToken } from '@/lib/utils/cookies';

export interface DailyRevenueItem {
  date: string;
  revenue: number;
}

export interface MonthlyRevenueItem {
  month: string;
  revenue: number;
}

export interface OrdersStats {
  ordersByStatus: {
    inProgress: number;
    canceled: number;
    pending: number;
    completed: number;
  };
  dailyRevenue: DailyRevenueItem[];
  monthlyRevenue: MonthlyRevenueItem[];
}

export interface AreaChartStatisticsResponse {
  orders: OrdersStats;
}
// lib/apis/dashboard/area-chart-statistics.ts

export async function getAreaChartStatistics(): Promise<AreaChartStatisticsResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/statistics`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch area chart statistics: ${response.status} ${errorText}`
      );
    }

    const fullResponse = await response.json();

    // ✅ FIX: Access statistics.orders instead of orders directly
    if (!fullResponse.statistics?.orders) {
      throw new Error('Invalid response: missing orders data');
    }

    return {
      orders: {
        dailyRevenue: fullResponse.statistics.orders.dailyRevenue || [],
        monthlyRevenue: fullResponse.statistics.orders.monthlyRevenue || [],
        ordersByStatus: fullResponse.statistics.orders.ordersByStatus || {
          inProgress: 0,
          canceled: 0,
          pending: 0,
          completed: 0,
        },
      },
    };
  } catch (error) {
    console.error('❌ Exception in getAreaChartStatistics:', error);
    throw error;
  }
}
