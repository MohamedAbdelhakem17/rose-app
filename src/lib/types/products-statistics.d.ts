// Product item inside category
declare type CategoryProduct = {
  title: string;
  price: number;
  imgCover: string;
  quantity: number;
  sold?: number;
};

// Category section
declare type ProductsByCategory = {
  _id: string;
  count: number;
  category: string;
  products: CategoryProduct[];
};

// Top selling item
declare type TopSellingProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
  id: string;
};

// Low stock item
declare type LowStockProduct = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
  id: string;
};

// statistics object
declare type Statistics = {
  productsByCategory: ProductsByCategory[];
  topSellingProducts: TopSellingProduct[];
  lowStockProducts: LowStockProduct[];
};

// root response
declare type ProductStatisticsResponse = ApiResponse<{
  statistics: Statistics;
}>;
