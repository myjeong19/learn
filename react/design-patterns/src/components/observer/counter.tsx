import { useEffect, useState } from 'react';
import { emitter } from '.';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const increment = () => {
      setCount(prev => prev + 1);
    };

    const decrement = () => {
      setCount(prev => prev - 1);
    };
    emitter.on('inc', increment);
    emitter.on('dec', decrement);

    return () => {
      emitter.off('inc', increment);
      emitter.off('dec', decrement);
    };
  }, []);

  return <div>#:{count}</div>;
}
