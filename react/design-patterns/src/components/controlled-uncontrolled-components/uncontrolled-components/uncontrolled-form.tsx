import { createRef } from 'react';

export default function UncontrolledForm() {
  const nameInputRef = createRef<HTMLInputElement>();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    console.log(nameInputRef.current?.value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={nameInputRef} />
      <button>Submit</button>
    </form>
  );
}
