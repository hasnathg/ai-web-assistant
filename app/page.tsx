"use client";

import { useState } from "react";

type Mode = "summarize" | "rewrite" | "extract-json";
type Style = "simple" | "role" | "strict";

export default function Home() {

  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("summarize");
  const [style, setStyle] = useState<Style>("simple");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleRunAi(){
    try{
      setLoading(true);
      setResult("");
       setError("");

      const res = await fetch("api/ai",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text, mode, style})
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || "Request failed");
      }

      setResult(data.output);
    } catch(err){
      setResult(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
  setText("");
  setResult("");
  setError("");
  }

  function formatResult(output: string) {
    if (mode != "extract-json") {
      return output;
    }

    try {
      const parsed = JSON.parse(output);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return output;
    }
  }

  function estimateTokens(text: string) {
  return Math.ceil(text.length / 4);
  }

  async function handleCopyResult() {
    if (!result) return;

    await navigator.clipboard.writeText(formatResult(result));
    setCopied(true);

    setTimeout(()=> {
      setCopied(false);
    }, 1500);
  }

  return (
 <main className="min-h-screen bg-white px-6 py-10">
  <div className="mx-auto max-w-3xl">
    <h1 className="text-3xl font-bold mb-6">AI Web Assistant</h1>
     <p className="mb-6 text-sm text-gray-600">
          Paste text, choose a mode, and generate an AI response.
     </p>

     <div className="mb-4">
      <label htmlFor="mode" className="mb-2 block text-sm font-medium">Mode</label>
      <select name="" id="mode" value={mode}
      onChange={(e)=> setMode(e.target.value as Mode)}
      className="w-full rounded-lg border p-3">
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
            onChange={(e) => setStyle(e.target.value as Style)}
            className="w-full rounded-lg border p-3"
          >
            <option value="simple">Simple</option>
            <option value="role">Role</option>
            <option value="strict">Strict</option>
          </select>
        </div>

     <div className="mb-4" >
      <label htmlFor="text" className="mb-2 block text-sm font-medium">Input Text</label>
      
      <textarea className="min-h-55 w-full border rounded-lg p-4" 
      placeholder="Paste your text here..."
      id="text"
      value={text}
      onChange={(e)=> setText(e.target.value)} />

    <div className="mt-2 flex gap-4 text-xs text-gray-500">
    <p>Characters: {text.length}</p>
    <p>Estimated Tokens: {estimateTokens(text)}</p>
    </div>
    {estimateTokens(text) > 1500 && (
  <p className="mt-2 text-xs text-orange-600">
    Warning: This input is getting long. The app may trim or limit text later.
  </p>
)}
      
      </div>

      <div className="flex gap-3">
         <button 
      type="button"
      onClick={handleRunAi}
      disabled={loading || !text.trim()}
      className="rounded-lg border px-5 py-3 font-medium">
        {loading ? "Running..." : "Run AI"}
        </button>

         <button
        type="button"
        onClick={handleClear}
        disabled={loading}
        className="rounded-lg border px-5 py-3 font-medium disabled:opacity-50"
      >
        Clear
      </button>
      </div>

     

      {error && (
      <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">
        <h2 className="mb-1 text-sm font-semibold text-red-700">Error</h2>
        <p className="text-sm text-red-700">{error}</p>
      </div>
      )}

        <div className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-2">Result</h2>

        <button 
        type="button"
        onClick={handleCopyResult}
        disabled={!result}
        className="mb-3 rounded-lg border px-3 py-2 text-sm font-medium disabled:opacity-50"
        >
          {copied ? "Copied!" : "Copy Result"}
        </button>
        <pre className="whitespace-pre-wrap text-sm text-gray-800 overflow-x-auto">{result ? formatResult(result) : "Your result will appear here..."}</pre>
        
        </div>
        
        </div>
        
        </main>
  );
}
