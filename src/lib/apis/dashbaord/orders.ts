import { getToken } from '@/lib/utils/cookies';

export interface OrderByStatus {
  _id: string | null;
  count: number;
}

export interface DailyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface MonthlyRevenue {
  _id: string;
  revenue: number;
  count: number;
}

export interface StatisticsResponse {
  message: string;
  statistics: StatisticsData;
}

export interface StatisticsData {
  ordersByStatus: OrderByStatus[];
  dailyRevenue: DailyRevenue[];
  monthlyRevenue: MonthlyRevenue[];
}
export async function getStatistics(): Promise<StatisticsResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  // Build the full endpoint URL using the global environment variable
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/statistics/orders`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch statistics: ${response.statusText}`);
  }

  const data: StatisticsResponse = await response.json();
  return data;
}
