"use client";

import * as React from "react";

export const ThemeContext = React.createContext(null);

export const ToggleThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState("dark");
  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
