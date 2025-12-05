import { cn } from '@/lib/utils/utils';
import React, { ReactNode } from 'react';

/* Props for StatisticsItem */
interface Iprops {
  background: string;
  textColor: string;
  icon: ReactNode;
  number: number;
  title: string;
}

/* Single statistic card */
export default function StatisticsItem({
  background,
  icon,
  number,
  textColor,
  title,
}: Iprops) {
  return (
    <section
      className={cn(
        `w-[213px] min-h-32 rounded-lg font-semibold p-4`,
        background,
        textColor
      )}
    >
      {icon}
      <div className='flex flex-col gap-1 mt-3'>
        <h2 className='text-2xl'>{number} </h2>
        <p className='text-zinc-800 font-medium'>{title}</p>
      </div>
    </section>
  );
}
