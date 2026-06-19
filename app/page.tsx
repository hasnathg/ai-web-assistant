"use client";

import ResultPanel from "@/components/ResultPanel";
import ErrorAlert from "@/components/ErrorAlert";
import AIForm from "@/components/AIForm";
import { sendAIRequest } from "@/lib/apiClient";
import type { Mode, Style, ResponseMeta } from "@/types/ai"

import { useState } from "react";


export default function Home() {

  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("summarize");
  const [style, setStyle] = useState<Style>("simple");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [details, setDetails] = useState<ResponseMeta| null>(null);

  async function handleRunAi(){
    try{
      setDetails(null);
      setLoading(true);
      setResult("");
       setError("");
       setCopied(false);

      const data = await sendAIRequest({ text, mode, style });

      setResult(data.output || "No output returned from model.");

      setDetails({
        usage: data.usage,
        model: data.model,
        status: data.status,
      });
    } catch(err){
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

 

  function handleClear() {
    setDetails(null);
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
        details={details}
        onCopy={handleCopyResult}
        formatResult={formatResult}
        />
        
        </div>
        
        </main>
  );
}
