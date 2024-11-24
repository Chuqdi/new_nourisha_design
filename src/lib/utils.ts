import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomToken(length = 10) {
  const generateRandomCharacter = () => Math.random().toString(36)[2];

  return Array.from({ length }, generateRandomCharacter).join("");
}