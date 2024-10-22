import { useChangeUserSetting } from "@api/users/useChangeUserSetting";
import { createContext, useState, ReactNode, useEffect } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

interface DarkModeContentProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContentProps | null>(null);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const initialDarkMode = localStorage.getItem("isDarkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialDarkMode);
  const changeDarkMode = useChangeUserSetting({ dark_mode: isDarkMode });
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    changeDarkMode.mutate();
    setIsDarkMode(!isDarkMode);
  };
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
