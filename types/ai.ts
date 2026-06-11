export type Mode = "summarize" | "rewrite" | "extract-json";

export type Style = "simple" | "role" | "strict";

export type AIRequest = {
    text: string;
    mode: Mode;
    style: Style;
};

export type AIResponse = {
    output: string;
    usage: unknown;
    model: string;
    status: string;
};