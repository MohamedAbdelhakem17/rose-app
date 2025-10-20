'use client';

import { useEffect, useRef, useState } from 'react';
import useSessionStorage from '@/hooks/use-session-storage';

type Props = {
  initialTimeInSeconds: number;
};

export default function useCounterManagement({ initialTimeInSeconds }: Props) {
  // Constants
  const SESSION_NAME = 'timer_end';

  // Hooks
  const { clearValue, getValue, setValue } = useSessionStorage({
    name: SESSION_NAME,
  });

  // State
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Functions
  const restartTimer = () => {
    const newEndTime = Date.now() + initialTimeInSeconds * 1000;

    setValue(newEndTime.toString());
    setTimeLeft(initialTimeInSeconds);
  };

  const updateCountdown = (endTime: number) => {
    const diff = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

    setTimeLeft(diff);

    if (diff === 0) {
      clearValue();

      // Delete  interval if exist
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  // Effect
  useEffect(() => {
    let endTime: number;
    const value = getValue();

    if (value) {
      // Set time if exist
      endTime = parseInt(value, 10);
    } else {
      // Set new time if not exist
      endTime = Date.now() + initialTimeInSeconds * 1000;

      setValue(endTime.toString());
    }

    updateCountdown(endTime);

    intervalRef.current = setInterval(() => updateCountdown(endTime), 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTimeInSeconds]);

  return {
    timeLeft,
    restartTimer,
  };
}
