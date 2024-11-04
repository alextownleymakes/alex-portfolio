import { useEffect, useState } from 'react';

const START_TIME = new Date('2000-01-01T00:00:00Z');

function useCurrentAngle(startingAngle: number, orbitalPeriod: number): number {
  const [currentAngle, setCurrentAngle] = useState<number>(startingAngle);

  useEffect(() => {
    const calculateAngle = () => {
      const now = new Date();
      const elapsedTimeInDays = (now.getTime() - START_TIME.getTime()) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

      // Calculate degrees per day
      const degreesPerDay = orbitalPeriod === 0 ? 1 : (360 / orbitalPeriod);
      
      // Calculate the current angle based on elapsed time
      const angle = (startingAngle + (degreesPerDay * elapsedTimeInDays)) % 360;
    //   if (startingAngle === 0 && orbitalPeriod === 0) console.log('angle: ', angle);

      setCurrentAngle(angle);
    };

    // Initial calculation
    calculateAngle();

    // Optional: Recalculate every hour
    const interval = setInterval(calculateAngle, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [startingAngle, orbitalPeriod]);

//   if (startingAngle === 0 && orbitalPeriod === 0) console.log('currentAngle: ', currentAngle);

  return currentAngle;
}

export default useCurrentAngle;
