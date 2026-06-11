type ResultPanelProps = {
    result: string;
    copied: boolean;
    onCopy: () => void;
    formatResult: (output: string) => string ;
};

export default function ResultPanel({
    result,
    copied,
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
        </div>
    );
}