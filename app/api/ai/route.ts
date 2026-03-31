import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function getInstructions(mode: string, style: string) {
    if (mode === "summarize") {
        if (style === "simple") {
            return "Summarize the text in 5 bullet points";
        }

        if (style === "role") {
            return (
                "You are a precise technical editor. "+
                "Summarize the text in 5 clear bullet points. "
            );
        }

        if (style === "strict") {
            return (
                "Summarize the text in exactly 5 bullet points.\n" +
                "Requirements:\n" +
                "- Each bullet must be under 15 words.\n" +
                "- Do not add any introduction or conclusion.\n" +
                "- Output only the bullet points."
            );
        }
    }

    if (mode === "rewrite") {
    if (style === "simple") {
      return "Rewrite the text in a friendly professional tone in 3 short sentences.";
    }

    if (style === "role") {
      return (
        "You are a professional career writing assistant. " +
        "Rewrite the text in a confident, polished, professional tone."
      );
    }

    if (style === "strict") {
      return (
        "Rewrite the text into exactly three professional sentences.\n" +
        "Requirements:\n" +
        "- Keep the original meaning.\n" +
        "- Each sentence must be concise.\n" +
        "- Do not add new information.\n" +
        "- Output only the three sentences."
      );
    }
  }

  if (mode === "extract-json") {
    return (
      "Extract information and return ONLY valid JSON. No extra text.\n" +
      "Schema:\n" +
      '{ "name": null, "email": null, "skills": [], "experience": [] }\n' +
      "Rules: If missing use null or []; do not add extra fields; output must be valid JSON."
    );
  }

  return null;

}

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const text = body.text;
        const mode = body.mode;
        const style = body.style || "simple";

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

        const response = await client.responses.create({
            model: "gpt-5-nano",
            instructions,
            input: text,
        });

        return Response.json({
            output: response.output_text,
        });

    
    } catch(error){
        console.error("AI route error:", error);

        return Response.json(
            { error: "Something went wrong while calling OpenAI." },
            { status: 500 }
        );
    }
}