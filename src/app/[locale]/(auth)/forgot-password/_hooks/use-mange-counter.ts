'use client';

import useCookie from '@/hooks/use-cookie';
import { useEffect, useRef, useState } from 'react';

type Props = {
  initialTime: number;
};

const useCounterManagement = ({ initialTime }: Props) => {
  // Constant
  const COOKIE_NAME = 'timer_end';

  // Hooks
  const { clearValue, setCookieValue, getCookieValue } = useCookie({
    name: COOKIE_NAME,
    expireInMinutes: initialTime,
  });

  // State
  const [timeLeft, setTimeLeft] = useState(() => {
    const value = getCookieValue();
    const savedEndTime = value ? parseInt(value, 10) : null;

    if (savedEndTime) {
      const diff = Math.max(0, Math.floor((savedEndTime - Date.now()) / 1000));
      return diff;
    }

    return initialTime;
  });

  // Ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function
  const tickCount = (
    endTime: number,
    intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(diff);

    if (diff === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // Effect
  useEffect(() => {
    const value = getCookieValue();
    let endTime: number;

    if (!value) {
      endTime = Date.now() + initialTime * 1000;

      setCookieValue(endTime.toString());
    } else {
      endTime = parseInt(value, 10);
    }

    tickCount(endTime, intervalRef);

    intervalRef.current = setInterval(
      () => tickCount(endTime!, intervalRef),
      1000
    );

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTime]);

  return { timeLeft, clearTimerFromCookie: clearValue };
};

export default useCounterManagement;
