import type {
    AIRequest, AIResponse, AIErrorResponse,
} from "@/types/ai";
import { isAIResponse } from "./utils";

export async function sendAIRequest(
    payload: AIRequest
): Promise<AIResponse> {
    const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data =await res.json();

    if (!res.ok) {
        const errorData = data as AIErrorResponse;
        throw new Error(errorData.error || "Request failed");
    }

    if (!isAIResponse(data)) {
        throw new Error("Invalid API response format.");
    }

    return data;
}