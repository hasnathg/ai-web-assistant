import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const text = body.text;
        const mode = body.mode;

        if (!text || typeof text !=="string") {
            return Response.json(
                { error: "Text is required." },
                { status: 400 }
            );
        }

        let prompt = "";

        if (mode === "summarise"){
            prompt = `Summarise this in 3 short bullet points:\n\n${text}`;
        } else if (mode === "rewrite") {
            prompt = `Rewrite this text in a clearer and more professional tone:\n\n${text}`;
        } else if (mode === "extract-json") {
        prompt = `Extract key information from this text and return valid JSON:\n\n${text}`;
        } else {
        prompt = text;
        }

        const response = await client.responses.create({
            model: "gpt-5-nano",
            input: prompt,
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