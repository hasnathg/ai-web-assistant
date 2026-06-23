import type { AIResponse, Mode, Style } from "@/types/ai";

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

export function isAIResponse(value: unknown): value is AIResponse {
  if (!value || typeof value !=="object") {
    return false;
  }

  const response = value as AIResponse;

  return (
    typeof response.output === "string" &&
    typeof response.model === "string" &&
    typeof response.status === "string" &&
    (
      response.usage === null ||
      typeof response.usage === "object"
    ) &&

    (response.estimatedTokens === undefined ||
      typeof response.estimatedTokens === "number"
    ) &&
    (
      response.wasTrimmed === undefined ||
      typeof response.wasTrimmed === "boolean"
    )
  );
}

export function trimToTokenLimit(
  text: string,
  maxInputTokens = 2000
){
  const estimatedTokens = estimateTokens(text);

  if (estimatedTokens > maxInputTokens) {
    return {
      estimatedTokens,
      safeText: text.slice(0, maxInputTokens*4),
      wasTrimmed: true,
    };
  }

  return {
    estimatedTokens,
    safeText: text,
    wasTrimmed: false,
  };
}