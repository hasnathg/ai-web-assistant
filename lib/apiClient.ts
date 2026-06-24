import type {
    AIResponse, AIErrorResponse, AIClientRequest,
} from "@/types/ai";
import { isAIResponse } from "./utils";

export async function sendAIRequest(
    payload: AIClientRequest
): Promise<AIResponse> {

    let res: Response | null = null;
    
    if (payload.inputMode === "file") {
        if (!payload.file) {
            throw new Error("Please select a file");
        }

        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("mode", payload.mode);
        formData.append("style", payload.style);

        res = await fetch("/api/ai", {
            method: "POST",
            body: formData,
            });
        } else {
            res = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            
            body: JSON.stringify({
                text: payload.text,
                mode: payload.mode,
                style: payload.style,
            }),
        });
    }

    if (!res) {
       throw new Error("Request was not created.");
   }

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