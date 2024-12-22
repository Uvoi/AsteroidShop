import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';

const ThemeContext = createContext<{
  theme: typeof darkTheme | typeof lightTheme;
  toggleTheme: () => void;
}>({
  theme: darkTheme, // Дефолтное значение
  toggleTheme: () => console.warn('No ThemeProvider found'),
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme === 'lightTheme' ? 'light' : 'dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme === 'dark' ? 'darkTheme' : 'lightTheme');
  }, [theme]);

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
      <MuiThemeProvider theme={themeMode}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
