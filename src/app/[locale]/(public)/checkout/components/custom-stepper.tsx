'use client';

import * as React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

type Step = {
  id: number;
  label: string;
  content: React.ReactNode;
  onDone?: () => void;
  // allow boolean or function to evaluate dynamically
  isNextDisabled?: boolean | (() => boolean);
};

export default function CustomStepper({ steps }: { steps: Step[] }) {
  const t = useTranslations();
  const locale = useLocale();
  const [step, setStep] = React.useState(1);
  const totalSteps = steps.length;
  const currentStep = steps[step - 1];

  const next = () => step < totalSteps && setStep(s => s + 1);
  const prev = () => step > 1 && setStep(s => s - 1);

  const handleNextClick = () => {
    if (step === totalSteps) {
      currentStep.onDone?.();
    } else {
      next();
    }
  };

  // compute disabled each render (support boolean or function)
  const isNextDisabled = React.useMemo(() => {
    const val = currentStep?.isNextDisabled;
    if (typeof val === 'function') return val();
    return !!val;
  }, [currentStep, step, steps]);

  // Use locale to determine RTL instead of document.dir
  const isRTL = locale === 'ar';

  return (
    <div className='max-w-xl w-full mx-auto mt-16 space-y-8 my-section-xs'>
      {/* Progress slider */}
      <div className='flex gap-2'>
        <Slider
          value={[Math.round((step / (totalSteps + 1)) * 100)]}
          max={100}
          step={1}
          onValueChange={([val]) => {
            const newStep = Math.round((val * totalSteps) / 100) || 1;
            setStep(newStep);
          }}
          className='w-full cursor-pointer'
          renderThumb={() => (
            <div
              className={cn(
                'h-6 w-6 rounded-full border border-maroon-700 bg-maroon-600 dark:bg-soft-pink-500 text-white text-xs font-semibold flex items-center justify-center shadow-md'
              )}
            >
              {step}
            </div>
          )}
        />
      </div>

      {/* Header */}
      <div className='flex items-center gap-4 text-start'>
        {step > 1 && (
          <Button
            variant='secondary'
            size='icon'
            className='flex gap-2 w-1/6 items-center'
            onClick={prev}
          >
            {isRTL ? <MoveRight size={18} /> : <MoveLeft size={18} />}
            {t('stepper-back')}
          </Button>
        )}
        <h2 className='text-2xl font-semibold mb-1'>{currentStep.label}</h2>
      </div>

      {/* Content */}
      <div className='shadow-sm text-center h-[350px] flex flex-col items-center justify-start overflow-y-auto p-4 custom-scrollbar'>
        {currentStep.content}
      </div>

      {/* Controls */}
      <div className='flex justify-end'>
        <Button
          className='flex items-center gap-2'
          onClick={handleNextClick}
          disabled={isNextDisabled}
        >
          {step === totalSteps ? t('stepper-done') : t('stepper-next')}
          {isRTL ? <MoveLeft size={18} /> : <MoveRight size={18} />}
        </Button>
      </div>
    </div>
  );
}
