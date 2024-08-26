import { Button, type ButtonProps, type ColorButtonProps } from '../compositions/button';

export function partialComponent(
  Component: (props: ButtonProps) => React.ReactElement,
  partialProps: ButtonProps
) {
  return (props: ColorButtonProps) => {
    return <Component {...partialProps} {...props} />;
  };
}

export const BlueButton = partialComponent(Button, { color: 'blue' });
