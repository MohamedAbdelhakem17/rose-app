'use client';

import { Button } from '@/components/shared/Button';
import useCounterManagement from './../_hooks/use-mange-counter';
// import { Button } from '@/components/ui/button';

type Props = {
  initialTime?: number;
};

export default function TimeCount({ initialTime = 1 }: Props) {
  // Query

  // Hook
  const { timeLeft, clearTimerFromCookie } = useCounterManagement({
    initialTime,
  });

  // Variable

  const content = {
    available: (
      <>
        {/* onClick handel reset otp */}
        <Button
          variant='ghost'
          className='hover:bg-transparent active:bg-transparent ring-0'
          onClick={clearTimerFromCookie}
        >
          Send a new code
        </Button>
      </>
    ),
    notAvailable: (
      <>
        <Button
          variant='ghost'
          className='hover:bg-transparent active:bg-transparent p-0 '
          disabled={timeLeft !== 0}
        >
          Send a new code in : {timeLeft} s
        </Button>
      </>
    ),
  };

  return (
    <div>
      {timeLeft === 0 ? content.available : content.notAvailable}
      <hr />
    </div>
  );
}
