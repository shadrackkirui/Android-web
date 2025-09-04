import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const lightTheme = {
  mode: "light",
  colors: {
    background: "#F8FAFC",
    textDark: "#0F172A",
    textLight: "#475569",
    primary: "#2563EB",
    accent: "#0EA5E9",
    card: "#E2E8F0",
    danger: "#DC2626",
  },
};

const darkTheme = {
  mode: "dark",
  colors: {
    background: "#0F172A",
    textDark: "#F8FAFC",
    textLight: "#CBD5E1",
    primary: "#3B82F6",
    accent: "#38BDF8",
    card: "#1E293B",
    danger: "#F87171",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.mode === "light" ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

 export const useTheme = () => useContext(ThemeContext);
