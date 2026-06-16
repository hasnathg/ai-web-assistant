import type { Mode, Style } from "@/types/ai";
import TokenInfo from "@/components/TokenInfo";

type AIFormProps = {
  text: string;
  mode: Mode;
  style: Style;
  loading: boolean;
  onTextChange: (value: string) => void;
  onModeChange: (value: Mode) => void;
  onStyleChange: (value: Style) => void;
  onRun: () => void;
  onClear: () => void;
};

export default function AIForm({
  text,
  mode,
  style,
  loading,
  onTextChange,
  onModeChange,
  onStyleChange,
  onRun,
  onClear,
}: AIFormProps) {
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

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRun}
          disabled={loading || !text.trim()}
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