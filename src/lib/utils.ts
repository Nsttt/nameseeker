import { clsx, type ClassValue } from "clsx";
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
