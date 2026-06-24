import type { InputMode, Mode, Style } from "@/types/ai";
import TokenInfo from "@/components/TokenInfo";


type AIFormProps = {
  inputMode: InputMode;
  text: string;
  mode: Mode;
  style: Style;
  loading: boolean;
  onTextChange: (value: string) => void;
  onFileSelect: (file: File | null) => void;
  onModeChange: (value: Mode) => void;
  onStyleChange: (value: Style) => void;
  onRun: () => void;
  onClear: () => void;
  canRun: boolean;
};

export default function AIForm({
  inputMode,
  text,
  mode,
  style,
  loading,
  onTextChange,
  onFileSelect,
  onModeChange,
  onStyleChange,
  onRun,
  onClear,
  canRun,
}: AIFormProps) {

async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>){
  try {
    const file = event.target.files?.[0];

    if (!file) {
      onFileSelect(null)
      return;
    }

    onFileSelect(file);

   
  } catch {
    alert("Could not select file.");
  }
}

  return (
    <>
      <div className="mb-4">
        <label htmlFor="mode" className="mb-2 block text-sm font-medium">
          Mode
        </label>

        <select
          id="mode"
          value={mode}
          onChange={(e) => onModeChange(e.target.value as Mode)}
          className="w-full rounded-lg border p-3"
        >
          <option value="summarize">Summarize</option>
          <option value="rewrite">Rewrite</option>
          <option value="extract-json">Extract JSON</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="style" className="mb-2 block text-sm font-medium">
          Style
        </label>

        <select
          id="style"
          value={style}
          onChange={(e) => onStyleChange(e.target.value as Style)}
          className="w-full rounded-lg border p-3"
        >
          <option value="simple">Simple</option>
          <option value="role">Role</option>
          <option value="strict">Strict</option>
        </select>
      </div>
      

      {inputMode === "text" && (
      <div className="mb-4">
        <label htmlFor="text" className="mb-2 block text-sm font-medium">
          Input Text
        </label>

        <textarea
          id="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste your text here..."
          className="min-h-55 w-full rounded-lg border p-4"
        />

        <TokenInfo text={text} />
      </div>
      )}

      {inputMode === "file" && (
        <div className="mb-4 rounded-lg border border-dashed p-4">
          <label htmlFor="file" className="mb-2 block text-sm font-medium">
            Upload File
          </label>

          <input
          id="file"
          type="file"
          accept=".txt"
          disabled={loading}
          onChange={handleFileChange}
          className="block w-full text-sm"/>

          <p className="mt-2 text-xs text-gray-500">
            File upload UI is ready. Processing will be added next.
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRun}
          disabled={loading || !canRun }
          className="rounded-lg border px-5 py-3 font-medium disabled:opacity-50"
        >
          {loading ? "Running..." : "Run AI"}
        </button>

        <button
          type="button"
          onClick={onClear}
          disabled={loading}
          className="rounded-lg border px-5 py-3 font-medium disabled:opacity-50"
        >
          Clear
        </button>
      </div>
    </>
  );
}