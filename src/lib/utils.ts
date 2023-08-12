import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringCaseCombinations(input: string): string[] {
  const combine = (char: string, index: number, comb: number): string =>
    comb & (1 << index) ? char.toUpperCase() : char.toLowerCase();

  return Array.from({ length: 1 << input.length }, (_, comb) =>
    [...input].map((char, index) => combine(char, index, comb)).join(""),
  );
}

export function getBaseURL() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
