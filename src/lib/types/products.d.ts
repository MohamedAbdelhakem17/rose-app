// --------------------------------------
//  Product Types
// --------------------------------------
/** Single product item (from API) */
declare type ProductType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: null | string;
  isInWishlist: boolean;
};

// --------------------------------------
//  Product Mapping Types
// --------------------------------------

/** Mapped product type (for UI display) */
declare type MappingProductType = Pick<
  ProductType,
  | '_id'
  | 'title'
  | 'slug'
  | 'imgCover'
  | 'isInWishlist'
  | 'rateAvg'
  | 'priceAfterDiscount'
  | 'price'
> & {
  labels: { name: string; variant: string }[];
};

// --------------------------------------
//  API Response Types
// --------------------------------------

/** Response: Get all products */
type GetProductResponse = ApiResponse<
  PaginatedResponse<{ products: ProductType[] }>
>;

/** Response: Get all mapped products */
type MappedProductResponse = Omit<GetProductResponse, 'products'> & {
  products: MappingProductType[];
};
