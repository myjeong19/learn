import { useImperativeHandle, useRef, forwardRef } from 'react';

import { type FormEvent, type ComponentPropsWithoutRef } from 'react';

export type FormHandle = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps }: FormProps,
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        console.log('CLEARING');
        form.current?.reset();
      },
    };
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Form submitted');

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
    // form.current?.reset();
  }

  return (
    <form {...otherProps} onSubmit={handleSubmit} ref={form}>
      {children}
    </form>
  );
});

export default Form;
