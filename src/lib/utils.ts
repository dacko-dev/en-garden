import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstWord(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function makePlural(str: string | null | undefined) {
  if (!str) return "";
  return str.endsWith("s") ? str : str + "s";
}
