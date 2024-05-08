# Advanced Component Types - Dynamic Components, Polymorphic Components & More

## Building Better Wrapper Components with ComponentPropsWithoutRef

- `ComponentPropsWithoutRef`를 사용하면 커스텀 `props`와, 기본 `props`를 병합 할 수 있다.
  - `ComponentPropsWithoutRef`는 기본 HTML Element의 모든 props를 포함한 객체를 반환한다.

```tsx
import { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...props} />
    </p>
  );
}
```

## Building a Wrapper Component That Renders Different Elements

- Discriminated Union을 사용하여, `button`과 `a`를 구분해서 렌더링 할 수 있다.

```tsx
import { type ComponentPropsWithoutRef } from 'react';

type ButtonProps = {
  el: 'button';
} & ComponentPropsWithoutRef<'button'>;

type AnchorProps = {
  el: 'anchor';
} & ComponentPropsWithoutRef<'a'>;

export default function Button({ children, ...props }: ButtonProps | AnchorProps) {
  // const { el, ...otherProps } = props;

  if (props.el === 'anchor') {
    return (
      <a className="button" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
}
```

## Working with Type Predicates & Facing TypeScript Limitations

- type predicate를 사용하여, 컴포넌트의 유형을 확인해 컴포넌트의 유연성을 유지할 수 있다.

```ts
import { type ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  href?: string;
};

// type predicate
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

export default function Button({ ...props }: ButtonProps | AnchorProps) {
  // const { el, ...otherProps } = props;

  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return <button className="button" {...props}></button>;
}
```

## Building a Basic Polymorphic Component

- 다형성 컴포넌트(Polymorphic Component)

  - ElementType는 JSX로 출력 가능한 유효한 컴포넌트 식별자를 받을 수 있다.

    ```ts
    import { ElementType } from 'react';

    type ContainerProps = {
      as: ElementType;
    };

    export default function Container({ as }: ContainerProps) {
      const Component = as;

      return <Component />;
    }
    ```

## Building a Better Polymorphic Component with Generics

- ContainerProps를 제네릭 타입으로 변환하여 사용할 수 있다.

```tsx
import { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type ContainerProps<T extends ElementType> = {
  as: ElementType;
  children: ReactNode;
} & ComponentPropsWithRef<T>;

export default function Container<C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) {
  const Component = as || 'div';

  return (
    <Component className="container" {...props}>
      {children}
    </Component>
  );
}
```

## Using forwardRef with TypeScript

- 참조를 전달하는 방법

```ts
import { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props },
  ref
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} {...props} ref={ref} />
    </p>
  );
});

export default Input;
```

## Building Another Wrapper Component (Custom Form Component)

## Sharing Logic with "unknown" & Type Casting

```tsx
import { type FormEvent, type ComponentPropsWithoutRef } from 'react';
type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: unknown) => void;
};

export default function Form({ onSave, children, ...otherProps }: FormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Form submitted');

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form {...otherProps} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
```

## Exposing Component APIs with useImperativeHandle (with TypeScript)

```tsx
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

```
