import { CheckCheck, HelpCircle, TriangleAlert, Truck } from 'lucide-react';

export function getOrderStatus(t: (_key: string) => string) {
  return [
    {
      name: t('canceled'),
      Icon: TriangleAlert,
      color: 'text-maroon-500',
      condition: (order: OrderType) => order.state === 'canaled',
    },
    {
      name: t('delivered'),
      Icon: CheckCheck,
      color: 'emerald',
      condition: (order: OrderType) => order.isDelivered === true,
    },
    {
      name: t('pending'),
      Icon: Truck,
      color: 'text-yellow-600',
      condition: (order: OrderType) => order.state === 'pending',
    },
    {
      name: t('unknown'),
      Icon: HelpCircle,
      color: 'text-gray-500',
      condition: (order: OrderType) => {
        void order;
        return true;
      },
    },
  ];
}
