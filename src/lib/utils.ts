import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Strip Minecraft-style color/format codes (legacy & hex).
export function stripColorCodes(input?: string | null) {
  if (!input) return "";
  const hexPattern = /§x(?:§.){6}/gi;
  const legacyPattern = /[§&][0-9a-fk-or]/gi;
  const fallbackPattern = /[§&]./g; // catch any leftover sequences
  return input.replace(hexPattern, "").replace(legacyPattern, "").replace(fallbackPattern, "");
}
