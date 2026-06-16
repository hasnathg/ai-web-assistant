import type { Mode, Style } from "@/types/ai";

export function estimateTokens(text: string){
    return Math.ceil(text.length / 4);
}

export function isValidMode(value: unknown): value is Mode {
  return (
    value === "summarize" ||
    value === "rewrite" ||
    value === "extract-json"
  );
}

export function isValidStyle(value: unknown): value is Style {
  return (
    value === "simple" ||
    value === "role" ||
    value === "strict"
  );
}