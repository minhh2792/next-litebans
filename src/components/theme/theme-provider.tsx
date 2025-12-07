"use client"
 
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
 
type ExtendedThemeProviderProps = ThemeProviderProps & {
  themes?: string[];
};

export const ThemeProvider = ({
  children,
  themes = ["latte", "frappe", "macchiato", "mocha"],
  attribute = "class",
  defaultTheme = "mocha",
  enableSystem = false,
  ...props
}: ExtendedThemeProviderProps) => {
  return (
    <NextThemesProvider
      themes={themes}
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}