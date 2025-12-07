import { useLocale, useTranslations } from 'next-intl';

import { StepState } from '../../../../../../lib/types/modal/step-state';
import Steps from '../../state-step';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type AddModalHeaderProps = {
  step: StepState;
  setStep: (_step: StepState) => void;
};
export default function AddModalHeader({ step, setStep }: AddModalHeaderProps) {
  // Translate
  const t = useTranslations();

  // Locale
  const locale = useLocale();

  // Variables
  const RTL: boolean = locale === 'ar';

  return (
    <div className=' flex flex-col justify-center items-start w-full'>
      <h1 className=' font-bold text-3xl mb-6'> {t('add-modal-header')} </h1>
      <Steps step={step} />

      {step === 'form' ? (
        <h2 className='font-medium text-maroon-600 dark:text-soft-pink-200 text-2xl'>
          {t('add-modal-form-subheader')}
        </h2>
      ) : (
        <div className=' flex justify-start items-center gap-4'>
          {RTL ? (
            <div
              className=' flex justify-center items-center w-9 h-9 rounded-full cursor-pointer text-white bg-maroon-600 dark:bg-soft-pink-200 dark:text-zinc-900'
              onClick={() => setStep('form')}
            >
              <ArrowRight />
            </div>
          ) : (
            <div
              className=' flex justify-center items-center w-9 h-9 rounded-full cursor-pointer text-white bg-maroon-600 dark:bg-soft-pink-200 dark:text-zinc-900'
              onClick={() => setStep('form')}
            >
              <ArrowLeft />
            </div>
          )}
          <h2 className='font-medium text-maroon-600 dark:text-soft-pink-200 text-2xl'>
            {t('add-modal-map-subheader')}
          </h2>
        </div>
      )}
    </div>
  );
}
