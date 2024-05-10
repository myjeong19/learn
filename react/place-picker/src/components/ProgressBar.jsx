import { useState, useEffect } from 'react';

export const ProgressBar = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 10);
    });

    return () => {
      clearInterval(interval);
    };
  });

  return <progress value={remainingTime} max={timer} />;
};
