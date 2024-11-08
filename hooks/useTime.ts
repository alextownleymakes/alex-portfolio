// useTime.ts
import { useEffect, useState } from 'react';

function useTime(updateInterval = 1000): Date {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return now;
}

export default useTime;
