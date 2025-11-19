import React from 'react';
import OrdersStatusChart from '../_components/order-status-chart';
import AreaChart from '../_components/area-chart/area-chart';

export default function page() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <OrdersStatusChart />
      <AreaChart />
    </div>
  );
}
