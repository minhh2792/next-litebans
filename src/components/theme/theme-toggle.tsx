"use client"
 
import * as React from "react"
import { Coffee, Palette, Snowflake, SunMedium, IceCream } from "lucide-react"
import { useTheme } from "next-themes"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
export const ThemeToggle = () => {
  const { setTheme } = useTheme()

  const themes = [
    { value: "latte", label: "Latte", icon: SunMedium, swatch: "#7287fd" },
    { value: "frappe", label: "Frappe", icon: IceCream, swatch: "#babbf1" },
    { value: "macchiato", label: "Macchiato", icon: Snowflake, swatch: "#b7bdf8" },
    { value: "mocha", label: "Mocha", icon: Coffee, swatch: "#b4befe" },
  ]
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" aria-hidden />
          <span className="sr-only">Chọn theme Catppuccin</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, label, icon: Icon, swatch }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="gap-2"
          >
            <Icon className="h-4 w-4" aria-hidden />
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: swatch }}
                aria-hidden
              />
              <span>{label}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}