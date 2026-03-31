"use client";

import { useState } from "react";

type Mode = "summarize" | "rewrite" | "extract-json";
type Style = "simple" | "role" | "strict";

export default function Home() {

  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("summarize");
  const [style, setStyle] = useState<Style>("simple");
  const [result, setResult] = useState("");

  async function handleRunAi(){
    try{
      setResult("Loading...");

      const res = await fetch("api/ai",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({text, mode})
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
    }
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
      
      <textarea className="w-full border rounded-lg p-4 min-h-50" 
      placeholder="Paste your text here..."
      id="text"
      value={text}
      onChange={(e)=> setText(e.target.value)} />
      </div>

      <button 
      type="button"
      onClick={handleRunAi}
      className="rounded-lg border px-5 py-3 font-medium">
        Run AI
        </button>

        <div className="mt-6 rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-2">Result</h2>
        <p className="whitespace-pre-wrap text-sm text-gray-800">{result || "Your result will appear here..."}</p>
        
        </div>
        
        </div>
        
        </main>
  );
}
