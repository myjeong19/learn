import { useState, useEffect } from 'react';

export const QuestionTimer = ({ onTimeout, timeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => clearTimeout(timer);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const interval = setInterval(
      () => setRemainingTime(prevRemainingTime => prevRemainingTime - 100),
      100
    );
    return () => clearInterval(interval);
  }, [remainingTime]);

  return <progress id='question-time' max={timeout} value={remainingTime} />;
};
