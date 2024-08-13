import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

export const Container = () => {
  const [{ background, foreground }, toggleTheme] = useContext(ThemeContext);
  console.log(background, foreground, toggleTheme);

  return (
    <main>
      <h1 style={{ background: background, color: foreground }}>Hello</h1>
      <button onClick={() => toggleTheme()}>Toggle theme</button>
    </main>
  );
};
