import {
  StatusId,
  OrderStatus,
  StatusInfo,
  ChartDataItem,
} from '../../lib/types/order-status';

export const statusMap: Record<StatusId, StatusInfo> = {
  completed: { label: 'Completed', color: '#10B981' },
  inProgress: { label: 'In progress', color: '#3B82F6' },
  canceled: { label: 'Canceled', color: '#EF4444' },
  pending: { label: 'Pending', color: '#F59E0B' },
};

const desiredOrder: StatusId[] = ['completed', 'inProgress', 'canceled'];

export function useChartData(orders: OrderStatus[]): ChartDataItem[] {
  const totalOrders = orders.reduce((sum, item) => sum + item.count, 0);

  return orders
    .filter(
      (item): item is OrderStatus & { _id: StatusId } =>
        item._id !== null && item._id in statusMap
    )
    .map(item => ({
      key: item._id,
      name: statusMap[item._id].label,
      value: item.count,
      percentage: Math.round((item.count / totalOrders) * 100),
      color: statusMap[item._id].color,
    }))
    .sort((a, b) => desiredOrder.indexOf(a.key) - desiredOrder.indexOf(b.key));
}
