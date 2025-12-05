'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAreaChartStatistics } from '@/hooks/dashboard/use-area-chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const RevenueChart = () => {
  const { data, isError, isLoading } = useAreaChartStatistics();

  // Handle loading state
  if (isLoading) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Revenue</CardTitle>
        </CardHeader>
        <CardContent className='h-96 flex items-center justify-center'>
          <p className='text-gray-500'>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  // Handle error or missing data
  if (isError || !data?.orders) {
    return (
      <Card className='w-full'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Revenue</CardTitle>
        </CardHeader>
        <CardContent className='h-96 flex items-center justify-center'>
          <p className='text-gray-500'>Failed to load revenue data</p>
        </CardContent>
      </Card>
    );
  }

  const dailyData = data.orders.dailyRevenue || [];
  const monthlyData = data.orders.monthlyRevenue || [];

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='weekly' className='w-full'>
          <TabsList className='flex justify-between  mb-4 gap-2 w-1/6 ml-auto'>
            <TabsTrigger className='text-red-500' value='weekly'>
              Last Week
            </TabsTrigger>
            <TabsTrigger value='monthly'>Monthly</TabsTrigger>
          </TabsList>

          {/* Last Week Tab */}
          <TabsContent value='weekly'>
            {dailyData.length === 0 ? (
              <div className='h-80 flex items-center justify-center'>
                <p className='text-gray-500'>No daily data available</p>
              </div>
            ) : (
              <div className='w-full h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={dailyData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='_id'
                      tickFormatter={date =>
                        new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                    />
                    <YAxis
                      tickFormatter={value =>
                        `$${value.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}`
                      }
                    />
                    <Tooltip
                      formatter={value =>
                        `$${Number(value).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      }
                      labelFormatter={label =>
                        new Date(label).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                    />
                    <Area
                      type='monotone'
                      dataKey='revenue'
                      stroke='#3B82F6'
                      fill='#3B82F6'
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>

          {/* Monthly Tab */}
          <TabsContent value='monthly'>
            {monthlyData.length === 0 ? (
              <div className='h-80 flex items-center justify-center'>
                <p className='text-gray-500'>No monthly data available</p>
              </div>
            ) : (
              <div className='w-full h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='_id'
                      tickFormatter={month => {
                        const [year, monthNum] = month.split('-');
                        const date = new Date(
                          parseInt(year),
                          parseInt(monthNum) - 1
                        );
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        });
                      }}
                    />
                    <YAxis
                      tickFormatter={value =>
                        `$${(value / 1000).toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 1,
                        })}k`
                      }
                    />
                    <Tooltip
                      formatter={value =>
                        `$${Number(value).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      }
                      labelFormatter={label => {
                        const [year, monthNum] = label.split('-');
                        const date = new Date(
                          parseInt(year),
                          parseInt(monthNum) - 1
                        );
                        return date.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        });
                      }}
                    />
                    <Area
                      type='monotone'
                      dataKey='revenue'
                      stroke='#10B981'
                      fill='#10B981'
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
