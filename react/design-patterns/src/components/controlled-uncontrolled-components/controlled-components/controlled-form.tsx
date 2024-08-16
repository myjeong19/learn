import { useState, useEffect } from 'react';

export default function ControlledForm() {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (name.length < 1) {
      console.log('name can not be empty!');
    }
  }, [name]);

  return (
    <form>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      <button>Submit</button>
    </form>
  );
}
