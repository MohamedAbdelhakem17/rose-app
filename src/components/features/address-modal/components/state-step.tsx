import { cn } from '@/lib/utils/utils';
import React from 'react';

type StateStepProps = {
  step: 1 | 2;
};
export default function StateStep({ step }: StateStepProps) {
  return (
    <div className='flex justify-start items-center w-full '>
      {/* Line */}
      <div className='w-1/3 border-t-8 border-maroon-600 dark:border-soft-pink-400 rounded-l-full'></div>

      {/* Step 1 */}
      <div className=' flex justify-center items-center px-2 rounded-full bg-maroon-600 text-white dark:bg-soft-pink-400'>
        <p>1</p>
      </div>

      {/* Line */}
      <div
        className={cn(
          'w-1/3 border-t-8',
          step === 1 && 'border-zinc-200 dark:border-zinc-600',
          step === 2 && 'border-maroon-600 dark:border-soft-pink-400'
        )}
      ></div>

      {/* Step 2 */}
      <div
        className={cn(
          'flex justify-center items-center px-2 rounded-full',
          step === 1 && 'bg-zinc-200 text-zinc-500 dark:bg-zinc-600',
          step === 2 && 'bg-maroon-600 text-white dark:bg-soft-pink-400'
        )}
      >
        <p>2</p>
      </div>

      {/* Line */}
      <div
        className={cn(
          'w-1/3 border-t-8 rounded-r-full',
          step === 1 && 'border-zinc-200 dark:border-zinc-600',
          step === 2 && 'border-maroon-600 dark:border-soft-pink-400'
        )}
      ></div>
    </div>
  );
}
