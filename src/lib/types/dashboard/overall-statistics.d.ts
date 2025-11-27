export interface StatisticsResponse {
  message: string;
  statistics: Statistics;
}

export interface Statistics {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  totalRevenue: number;
}

export interface ApiError {
  error:string
}