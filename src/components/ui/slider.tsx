'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils/utils';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  stepNumber?: number;
  totalSteps?: number;
  renderThumb?: (stepNumber: number) => React.ReactNode;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    { className, stepNumber = 1, totalSteps = 2, renderThumb, ...props },
    ref
  ) => {
    // Detect RTL from the document or a parent (you can also pass `isRTL` as prop if needed)
    const [isRTL, setIsRTL] = React.useState(false);

    React.useEffect(() => {
      // Check the computed direction of the document or a parent
      const dir =
        typeof document !== 'undefined'
          ? window.getComputedStyle(document.documentElement).direction
          : 'ltr';
      setIsRTL(dir === 'rtl');
    }, []);

    // Always calculate value in LTR terms (0% = step 1, 100% = last step)
    const value = [(stepNumber / totalSteps) * 100];

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        max={100}
        disabled
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          // Visually flip entire slider in RTL
          isRTL && 'scale-x-[-1]',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-500/40 dark:bg-zinc-600/50'>
          <SliderPrimitive.Range className='absolute h-full bg-maroon-600 dark:bg-soft-pink-500 transition-all' />
        </SliderPrimitive.Track>

        {/* Flip the thumb back so content isn't mirrored */}
        <SliderPrimitive.Thumb
          className={cn(
            'h-6 w-6 rounded-full border border-maroon-700 bg-maroon-600 dark:bg-soft-pink-500 text-white text-xs font-semibold flex items-center justify-center shadow-md',
            isRTL && 'scale-x-[-1]'
          )}
        >
          {renderThumb ? renderThumb(stepNumber) : stepNumber}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
