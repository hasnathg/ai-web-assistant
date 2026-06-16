import { runAI } from "@/lib/ai";
import { getInstructions } from "@/lib/prompts";
import type { AIRequest } from "@/types/ai";
import { isValidMode, isValidStyle } from "@/lib/utils";

export async function POST(request: Request) {
    try{
        const body = (await request.json()) as AIRequest;
        const { text, mode, style } = body;

        if (!text || typeof text !=="string") {
            return Response.json(
                { error: "Text is required." },
                { status: 400 }
            );
        }

        if (!isValidMode(mode) || !isValidStyle(style)) {
        return Response.json(
            { error: "Invalid mode or style." },
            { status: 400 }
        );
        }

       const instructions = getInstructions(mode, style);

       if (!instructions) {
        return Response.json(
            {error: "Invalid mode or style." },
            { status: 400 }
        );
       }

      const result = await runAI({
      instructions,
      input: text,
      mode,
      });

     return Response.json(result);
     } catch (error) {
     console.error("AI route error:", error);

        return Response.json(
            { error: "Something went wrong while calling OpenAI." },
            { status: 500 }
        );
    }
}