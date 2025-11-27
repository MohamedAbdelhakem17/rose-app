export interface CategoryStatisticsResponse {
  message: string;
  statistics: CategoryStatistic[];
}

export interface CategoryStatistic {
  _id: string;
  name: string;
  totalProducts: number;
  totalRevenue: number;
}


