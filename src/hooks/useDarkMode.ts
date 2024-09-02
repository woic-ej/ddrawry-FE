import { DarkModeContext } from "@store/DarkModeContext";
import { useContext } from "react";

export const useDarkMode = () => useContext(DarkModeContext);
