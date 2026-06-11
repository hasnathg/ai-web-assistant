import OpenAI from "openai";
import type { AIResponse, Mode } from "@/types/ai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type RunAIParams = {
  instructions: string;
  input: string;
  mode: Mode;
};

export async function runAI({ instructions, input, mode }: RunAIParams): Promise<AIResponse> {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    instructions,
    input,
    reasoning: { effort: "low" },
    max_output_tokens: mode === "extract-json" ? 800 : 800,
  });


  return {
    output: response.output_text?.trim() || "",
    usage: response.usage || null,
    model: response.model || "unknown-model",
    status: response.status || "unknown-status",
  };
}