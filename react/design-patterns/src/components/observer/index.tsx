import mitt from 'mitt';
import Parent from './parent';

export const emitter = mitt();

export default function Observer() {
  return <Parent />;
}
