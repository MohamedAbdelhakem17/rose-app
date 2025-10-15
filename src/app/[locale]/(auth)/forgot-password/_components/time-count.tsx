'use client';

import { useRef } from 'react';
import { Button } from '@/components/shared/Button';
import useCounterManagement from './../_hooks/use-mange-counter';

type Props = {
  initialTimeInSeconds?: number;
};

// TODO :
// Handle resend OTP logic with timer reset.
//   [1] Call the restartTimer function inside the onSuccess callback of the resendOTP mutation.
//   [2] In onSuccess, call restartTimer() to restart the countdown.

export default function TimeCount({ initialTimeInSeconds = 60 }: Props) {
  // Ref
  const isClient = useRef(typeof window !== 'undefined');

  // Hook
  const { timeLeft, restartTimer } = useCounterManagement({
    initialTimeInSeconds,
  });

  // Check if not in server
  if (!isClient.current) return null;

  // Variable
  const canSendNewCode = timeLeft === 0;

  return (
    // Actions
    <div className='text-end py-3'>
      {canSendNewCode ? (
        //  Resend code
        <Button
          type='button'
          variant='ghost'
          onClick={restartTimer}
          className='hover:bg-transparent text-primary font-medium select-none'
        >
          Send a new code
        </Button>
      ) : (
        // Counter ruining
        <Button
          type='button'
          variant='ghost'
          disabled
          className='hover:bg-transparent text-muted-foreground p-0 cursor-default select-none'
        >
          Send a new code in: {timeLeft}s
        </Button>
      )}
    </div>
  );
}
