// --------------------------------------
//  Order Types
// --------------------------------------
/** Single order item (from API) */
declare type OrderType = {
  shippingAddress: {
    street: string;
    city: string;
    phone: string;
    lat: string;
    long: string;
  };
  _id: string;
  user: string;
  orderItems: {
    product: ProductType;
    price: number;
    quantity: number;
    _id: string;
  }[];
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  __v: number;
};

// --------------------------------------
//  Order Mapping Types
// --------------------------------------
/** Mapped order type (for UI display) */
declare type MappedProductOrderItemType = {
  product: Pick<
    ProductType,
    | '_id'
    | 'title'
    | 'slug'
    | 'imgCover'
    | 'isInWishlist'
    | 'rateAvg'
    | 'priceAfterDiscount'
    | 'price'
    | 'rateCount'
  >;
} & Pick<OrderType['orderItems'][number], 'price' | 'quantity'>;

/** Mapped order for UI (clean version) */
declare type MappedOrderType = Pick<
  OrderType,
  | '_id'
  | 'orderNumber'
  | 'totalPrice'
  | 'paymentType'
  | 'isPaid'
  | 'isDelivered'
  | 'createdAt'
  | 'state'
> & {
  deliveryStatus: {
    name: string;
    color: string;
    Icon: React.ComponentType<{ className?: string }>;
  };
  items: MappedProductOrderItemType[];
};

// --------------------------------------
//  API Response Types
// --------------------------------------

/** Response: Get all Orders */
declare type GetOrdersResponse = ApiResponse<
  PaginatedResponse<{ orders: OrderType[] }>
>;

/** Response: Get all mapped products */
type MappedOrderResponse = Omit<GetOrdersResponse, 'orders'> & {
  orders: MappedOrderType[];
  metadata: Metadata;
};
