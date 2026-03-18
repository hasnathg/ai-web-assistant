import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const text = body.text;

        if (!text || typeof text !=="string") {
            return Response.json(
                { error: "Text is required." },
                { status: 400 }
            );
        }

        const response = await client.responses.create({
            model: "gpt-5-nano",
            input: `Summarise this in 3 short bullet points:\n\n${text}`,
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