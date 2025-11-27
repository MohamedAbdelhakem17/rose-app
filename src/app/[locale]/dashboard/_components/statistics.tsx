import React from 'react';
import StatisticsItem from './statistics-item';
import {
  CircleDollarSign,
  ClipboardList,
  Package,
  ReceiptText,
} from 'lucide-react';
import {
  ApiError,
  StatisticsResponse,
} from '@/lib/types/dashboard/overall-statistics';
import { getOverallStatistics } from '@/lib/apis/dashboard/overall-statistics';

export default async function Statistics() {
  // Fetch statistics from the API
  const data: StatisticsResponse | ApiError = await getOverallStatistics();

  // Display error message if API returns an error
  if ('error' in data) {
    return (
      <section className='w-[490px] h-[326px] bg-white rounded-md p-6 grid grid-cols-2 gap-4'>
        {' '}
        <p>{data.error}</p>
      </section>
    );
  }

  // Display all statistics when data is successfully fetched
  return (
    <section className='w-[490px] h-[326px] bg-white rounded-md p-6 grid grid-cols-2 gap-4'>
      <StatisticsItem
        background='bg-maroon-50'
        textColor='text-maroon-600'
        icon={<Package size={35} strokeWidth={1.5} />}
        number={data.statistics.totalProducts}
        title='Total products'
      />
      <StatisticsItem
        background='bg-[#0063D00D]'
        textColor='text-blue-600'
        icon={<ReceiptText size={35} strokeWidth={1.5} />}
        number={data.statistics.totalOrders}
        title='Total orders'
      />
      <StatisticsItem
        background='bg-[#753CBF0D]'
        textColor='text-[#753CBF]'
        icon={<ClipboardList size={35} strokeWidth={1.5} />}
        number={data.statistics.totalCategories}
        title='Total categories'
      />
      <StatisticsItem
        background='bg-[#0089610D]'
        textColor='text-emerald-600'
        icon={<CircleDollarSign size={35} strokeWidth={1.5} />}
        number={data.statistics.totalRevenue}
        title='Total revenue'
      />
    </section>
  );
}
