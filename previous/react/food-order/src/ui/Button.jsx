// 271-1. Styling the Button Component
export const Button = ({ children, textOnly, className, ...props }) => {
  let cssClasses = textOnly ? 'text-button' : 'button';
  cssClasses += ' ' + className;
  // 271-2. Adding the className Prop

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};
