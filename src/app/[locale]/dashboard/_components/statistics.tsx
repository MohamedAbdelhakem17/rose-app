import React from 'react';
import StatisticsItem from './statistics-item';
import { CircleDollarSign, ClipboardList, Package, ReceiptText } from 'lucide-react';

export default function Statistics() {
  return (
    <section className='w-[490px] h-[326px] bg-white rounded-md p-6 grid grid-cols-2 gap-4'>
      <StatisticsItem
        background='bg-maroon-50'
        textColor='text-maroon-600'
        icon={<Package size={35} strokeWidth={1.5} />}
        number={12}
        title='Total products'
      />
      <StatisticsItem
        background='bg-[#0063D00D]'
        textColor='text-blue-600'
        icon={<ReceiptText size={35} strokeWidth={1.5} />}
        number={12}
        title='Total orders'
      />
         <StatisticsItem
        background='bg-[#753CBF0D]'
        textColor='text-[#753CBF]'
        icon={<ClipboardList size={35} strokeWidth={1.5} />}
        number={12}
        title='Total categories'
      />
         <StatisticsItem
        background='bg-[#0089610D]'
        textColor='text-emerald-600'
        icon={<CircleDollarSign size={35} strokeWidth={1.5} />}
        number={12}
        title='Total revenue'
      />
    </section>
  );
}
