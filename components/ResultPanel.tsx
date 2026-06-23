import type { ResponseMeta } from "@/types/ai";

type ResultPanelProps = {
    result: string;
    copied: boolean;
    details: ResponseMeta | null;
    onCopy: () => void;
    formatResult: (output: string) => string ;
};

export default function ResultPanel({
    result,
    copied,
    details,
    onCopy,
    formatResult,
}: ResultPanelProps){
    return (
        <div className="mt-6 rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-semibold">Result</h2>

            <button 
            type= "button"
            onClick = {onCopy}
            disabled={!result}
            className="mb-3 rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-50">
                {copied ? "Copied!" : "Copy Result"}
            </button>

            <pre className="overflow-x-auto whitespace-pre-wrap text-sm text-gray-800">
                {result? formatResult(result) : "Your result will appear here..."}
                
            </pre>
            {details && (
            <div className="mt-4 rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                <p>Model: {details.model}</p>
                <p>Status: {details.status}</p>
                <p>Input tokens: {details.usage?.input_tokens ?? "N/A"}</p>
                <p>Output tokens: {details.usage?.output_tokens ?? "N/A"}</p>
                <p>Total tokens: {details.usage?.total_tokens ?? "N/A"}</p>
                <p>Estimated input tokens: {details.estimatedTokens ?? "N/A"}</p>
                <p>Input trimmed: {details.wasTrimmed ? "Yes" : "No"}</p>
            </div>
            )}
        </div>
        
    );
}