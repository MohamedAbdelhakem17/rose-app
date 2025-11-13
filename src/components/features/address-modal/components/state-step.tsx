import { cn } from '@/lib/utils/utils';
import React from 'react';
import { StepState } from '../../../../lib/types/modal/step-state';

type StepsProps = {
  step: StepState;
};
export default function Steps({ step }: StepsProps) {
  return (
    <div className='flex justify-start items-center w-full '>
      {/* Line */}
      <div className='w-1/3 border-t-4 border-maroon-600 dark:border-soft-pink-400 rounded-l-full'></div>

      {/* Step 1 */}
      <div className=' flex justify-center items-center px-2 rounded-full bg-maroon-600 text-white dark:bg-soft-pink-400'>
        <p>1</p>
      </div>

      {/* Line */}
      <div
        className={cn(
          'w-1/3 border-t-4',
          step === 'form' && 'border-zinc-200 dark:border-zinc-600',
          step === 'map' && 'border-maroon-600 dark:border-soft-pink-400'
        )}
      ></div>

      {/* Step 2 */}
      <div
        className={cn(
          'flex justify-center items-center px-2 rounded-full',
          step === 'form' && 'bg-zinc-200 text-zinc-500 dark:bg-zinc-600',
          step === 'map' && 'bg-maroon-600 text-white dark:bg-soft-pink-400'
        )}
      >
        <p>2</p>
      </div>

      {/* Line */}
      <div className='w-1/3 border-t-4 rounded-r-full border-zinc-200 dark:border-zinc-600'></div>
    </div>
  );
}
