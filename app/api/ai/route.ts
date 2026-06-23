import { runAI } from "@/lib/ai";
import { getInstructions } from "@/lib/prompts";
import type { AIRequest } from "@/types/ai";
import { isValidMode, isValidStyle, trimToTokenLimit, } from "@/lib/utils";
import { readDocumentText } from "@/lib/documentReader";

export async function POST(request: Request) {
    try{
         const contentType = request.headers.get("content-type") || "";

        let text = "";
        let mode: unknown;
        let style: unknown;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            const file = formData.get("file");
            mode = formData.get("mode");
            style = formData.get("style");

            if (!(file instanceof File)) {
                return Response.json(
                    { error: "File is required." },
                    { status: 400 }
                );
            }
            text = await readDocumentText(file);
        } else {
            const body = (await request.json()) as AIRequest;

            text= body.text;
            mode = body.mode;
            style = body.style;
        }

        if (!text || typeof text !== "string") {
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

        const {
        safeText,
        estimatedTokens,
        wasTrimmed,
       } = trimToTokenLimit(text, 2000);

      const result = await runAI({
      instructions,
      input: safeText,
      mode,
      });

     return Response.json({
        ...result,
        estimatedTokens,
        wasTrimmed,
     });
     } catch (error) {
     console.error("AI route error:", error);

        return Response.json(
            { error: "Something went wrong while calling OpenAI." },
            { status: 500 }
        );
    }
}