export function getOrderStatus(t: (_key: string) => string) {
  return [
    {
      name: t('canceled'),
      Icon: 'cancel',
      color: 'text-maroon-500',
      condition: (order: OrderType) => order.state === 'canaled',
    },
    {
      name: t('delivered'),
      Icon: 'check',
      color: 'text-emerald-600',
      condition: (order: OrderType) => order.isDelivered === true,
    },
    {
      name: t('pending'),
      Icon: 'pending',
      color: 'text-yellow-600',
      condition: (order: OrderType) => order.state === 'pending',
    },
    {
      name: t('unknown'),
      Icon: 'unknown',
      color: 'text-gray-500',
      condition: (order: OrderType) => {
        void order;
        return true;
      },
    },
  ];
}
