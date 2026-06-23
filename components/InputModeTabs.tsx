import type { InputMode } from "@/types/ai";

type InputModeTabsProps = {
    inputMode: InputMode;
    onInputModeChange: (value: InputMode) => void;
};

export default function InputModeTabs({
     inputMode,
     onInputModeChange,
}: InputModeTabsProps) {
    return (
        <div className="mb-4 flex gap-2">
            <button
            type="button"
            onClick={() => onInputModeChange("text")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${
            inputMode === "text" ? "bg-gray-100" : ""}`}
            >
                Text
            </button>

            <button 
            type="button"
            onClick={() => onInputModeChange("file")}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${
            inputMode === "file" ? "bg-gray-100" : ""}`}
            >
                File
            </button>
        </div>
    );
}