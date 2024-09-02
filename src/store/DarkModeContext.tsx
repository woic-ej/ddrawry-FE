import { createContext, useState, ReactNode } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContentProps {
  isDarkMode: boolean;
  toggleDarkMode: (value: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContentProps | undefined>(undefined);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};


