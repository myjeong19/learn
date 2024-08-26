export type ButtonProps = {
  size?: 'small';
  color: string;
  text?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { size, color, text, ...outer } = props;

  return (
    <button
      style={{
        fontSize: size === 'small' ? '8px' : '32px',
        backgroundColor: color,
      }}
      {...outer}
    >
      {text}
    </button>
  );
}

export type ColorButtonProps = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RedButton(props: ColorButtonProps) {
  return <Button {...props} color="crimson" />;
}

export function GreenSmallButton(props: ColorButtonProps) {
  return <Button {...props} color="green" size="small" />;
}
