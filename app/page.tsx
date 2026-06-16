"use client";

import ResultPanel from "@/components/ResultPanel";
import ErrorAlert from "@/components/ErrorAlert";
import AIForm from "@/components/AIForm";

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
       setCopied(false);

      const res = await fetch("/api/ai",{
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

      setResult(data.output || "No output returned from model.");
    } catch(err){
      setError(
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

    <AIForm
      text={text}
      mode={mode}
      style={style}
      loading={loading}
      onTextChange={setText}
      onModeChange={setMode}
      onStyleChange={setStyle}
      onRun={handleRunAi}
      onClear={handleClear}
    />

      <ErrorAlert error={error}/>

        <ResultPanel
        result={result}
        copied={copied}
        onCopy={handleCopyResult}
        formatResult={formatResult}
        />
        
        </div>
        
        </main>
  );
}
