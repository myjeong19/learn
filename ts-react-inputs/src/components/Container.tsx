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
