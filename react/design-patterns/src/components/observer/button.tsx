import { emitter } from '.';

export default function Button() {
  const incrementHandler = () => {
    emitter.emit('inc');
  };

  const decrementHandler = () => {
    emitter.emit('dec');
  };

  return (
    <div>
      <button onClick={incrementHandler}>+</button>
      <button onClick={decrementHandler}>-</button>
    </div>
  );
}
