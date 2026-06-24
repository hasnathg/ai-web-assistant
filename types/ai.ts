export type Mode = "summarize" | "rewrite" | "extract-json";

export type Style = "simple" | "role" | "strict";

export type AIRequest = {
    text: string;
    mode: Mode;
    style: Style;
};

export type AIResponse = {
    output: string;
    usage: {
        input_tokens? : number;
        output_tokens? : number;
        total_tokens? : number;
    } | null;
    model: string;
    status: string;
    estimatedTokens?: number;
    wasTrimmed?: boolean;
};

export type AIErrorResponse = {
    error: string;
};

export type ResponseMeta = Pick<
AIResponse,
"usage" | "model" | "status" | "estimatedTokens" | "wasTrimmed"
>;

export type InputMode = "text" | "file";

export type AIClientRequest = {
    inputMode: InputMode;
    text: string;
    file: File | null;
    mode: Mode;
    style: Style;
};