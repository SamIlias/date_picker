import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === Theme.Dark);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? Theme.Dark : Theme.Light);
  }, [isDark]);

  return <DarkModeContext value={{ isDark, toggleTheme }}>{children}</DarkModeContext>;
};

export const useDarkMode = () => {
  const ctx = useContext(DarkModeContext);
  if (!ctx) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return ctx;
};
