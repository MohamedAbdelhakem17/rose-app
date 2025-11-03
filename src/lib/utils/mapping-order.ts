import { getOrderStatus } from '../constants/order-delivery-status.constant';

/**
 * Map API order data to a UI-friendly structure
 */
export function mappingOrders(
  orders: OrderType[],
  t: (_key: string) => string
): MappedOrderType[] {
  const LABEL_RULES = getOrderStatus(t);

  return orders.map(order => {
    // Match first valid rule or fallback to "unknown"
    const matchedStatus =
      LABEL_RULES.find(rule => rule.condition(order)) ??
      LABEL_RULES[LABEL_RULES.length - 1];

    return {
      _id: order._id,
      orderNumber: order.orderNumber,
      totalPrice: order.totalPrice,
      paymentType: order.paymentType,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      createdAt: order.createdAt,
      state: order.state,
      deliveryStatus: {
        name: matchedStatus.name,
        color: matchedStatus.color,
        Icon: matchedStatus.Icon,
      },
      items: order.orderItems.map(item => ({
        product: {
          _id: item.product._id,
          title: item.product.title,
          slug: item.product.slug,
          imgCover: item.product.imgCover,
          isInWishlist: item.product.isInWishlist,
          rateAvg: item.product.rateAvg,
          rateCount: item.product.rateCount,
          price: item.product.price,
          priceAfterDiscount: item.product.priceAfterDiscount,
        },
        price: item.price,
        quantity: item.quantity,
      })),
    };
  });
}
