"use client";
import { ThemeProvider as NextTheme } from "next-themes";
import { FC, ReactNode } from "react";

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <NextTheme defaultTheme="system" attribute="class">
      {children}
    </NextTheme>
  );
};

export default ThemeProvider;
