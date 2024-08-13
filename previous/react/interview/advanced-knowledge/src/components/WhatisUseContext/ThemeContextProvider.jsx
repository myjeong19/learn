// What do you know about useContext?

// React Context는 전역 상태를 관리하는 훅이다.
import { createContext, useState } from 'react';

const themes = {
  light: {
    foreground: '#000',
    background: '#eee',
  },
  dark: {
    foreground: '#fff',
    background: '#222',
  },
};

export const ThemeContext = createContext();
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);
  const [activeTheme, setActiveTheme] = useState('light');

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
    setTheme(themes[nextTheme]);
    setActiveTheme(nextTheme);
  };

  return <ThemeContext.Provider value={[theme, toggleTheme]}>{children}</ThemeContext.Provider>;
};
