import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef<any>();
  const navigate = useNavigate();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      localStorage.removeItem('secondsRemaining');
      navigate('/forgot-password');
    }
  }, [delay]);
};

export const twoDigits = (num: any) => String(num).padStart(2, '0');
