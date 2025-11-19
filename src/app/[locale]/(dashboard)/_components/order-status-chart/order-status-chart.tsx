'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useChartData } from '../../../../../hooks/dashboard/use-chart-data';
import { CustomTooltip } from './custom-tooltip';
import { useStatistics } from '@/hooks/dashboard/use-orders-statistics';
import { StatusId } from '@/lib/types/order-status';

const OrdersStatusChart = () => {
  // Fetch statistics data using a custom hook
  const { data } = useStatistics();

  // Transform the raw ordersByStatus data into the shape expected by the chart hook
  const chartData = useChartData(
    (data?.statistics?.ordersByStatus || []) // Default to empty array if no data
      .filter(
        // Only include items with a valid status ID
        item =>
          ['completed', 'inProgress', 'canceled', 'pending'].includes(
            item._id ?? '' // Replace null/undefined with empty string to avoid errors
          )
      )
      .map(item => ({
        _id: item._id as StatusId, // Cast to StatusId because we've filtered for valid values
        count: item.count, // Keep the original count
      }))
  );

  return (
    // Card container for the chart
    <Card className='w-full max-w-md mx-auto'>
      {/* Card header with title */}
      <CardHeader>
        <CardTitle className='text-2xl font-semibold text-center'>
          Orders Status
        </CardTitle>
      </CardHeader>

      {/* Card content */}
      <CardContent className='space-y-6'>
        {/* Pie chart wrapper */}
        <div className='flex items-center justify-center'>
          <ResponsiveContainer width='100%' height={240}>
            <PieChart>
              <Pie
                // Cast to any to satisfy Recharts typing
                //disabling the any type is the standard for recharts based on my humble research
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data={chartData as any}
                cx='50%' // Center X
                cy='50%' // Center Y
                innerRadius={50} // Inner radius for donut chart
                outerRadius={100} // Outer radius
                paddingAngle={2} // Space between slices
                dataKey='value' // Key for slice values
              >
                {/* Map over chart data to render colored slices */}
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              {/* Custom tooltip for slice hover */}
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / data summary below the chart */}
        <div className='space-y-3'>
          {chartData.map((item, index) => (
            <div key={index} className='flex items-center justify-between'>
              {/* Status label with color indicator */}
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                <span className='text-sm text-gray-700'>{item.name}</span>
              </div>
              {/* Count and percentage */}
              <span className='text-sm font-medium text-gray-900'>
                {item.value.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersStatusChart;
