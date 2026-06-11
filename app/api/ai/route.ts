import { runAI } from "@/lib/ai";
import { getInstructions,type Mode, type Style } from "@/lib/prompts"

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const text = body.text;
        const mode = body.mode as Mode;
        const style = (body.style || "simple") as Style;

        if (!text || typeof text !=="string") {
            return Response.json(
                { error: "Text is required." },
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