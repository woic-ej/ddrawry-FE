import { DarkModeContext } from "@store/DarkModeContext";
import { useContext } from "react";

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
