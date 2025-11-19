'use client';

import { useEffect, useState, useTransition } from "react";
import { journalPrompts } from "@/data/content";

const STORAGE_KEY = "harmony-health-journal";

export function JournalPrompts() {
  const [entry, setEntry] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(journalPrompts[0]);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      startTransition(() => {
        setEntry(saved);
      });
    }
  }, [startTransition]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, entry);
  }, [entry]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#4c4b48]">
        <span className="rounded-full border border-[#caa36a]/60 bg-white px-3 py-2 text-[#caa36a]">
          Choose a prompt
        </span>
        <div className="flex flex-wrap gap-2">
          {journalPrompts.map((prompt) => (
            <button
              type="button"
              key={prompt}
              onClick={() => setSelectedPrompt(prompt)}
              className={`rounded-full border px-3 py-2 text-[11px] transition ${
                selectedPrompt === prompt
                  ? "border-[#3d7c6e] bg-[#3d7c6e] text-white"
                  : "border-[#caa36a]/40 bg-white text-[#4c4b48] hover:border-[#3d7c6e]/50"
              }`}
            >
              {prompt.split("?")[0]}?
            </button>
          ))}
        </div>
      </div>

      <p className="rounded-2xl border border-[#3d7c6e]/20 bg-[#3d7c6e]/6 px-4 py-3 text-sm leading-relaxed text-[#1d1c1a]">
        {selectedPrompt}
      </p>

      <textarea
        className="min-h-[160px] w-full rounded-2xl border border-[#3d7c6e]/25 bg-white/85 p-4 text-sm leading-relaxed text-[#1d1c1a] shadow-[0_20px_50px_-46px_rgba(24,23,20,0.45)] outline-none ring-1 ring-transparent transition focus:ring-[#3d7c6e]/40"
        placeholder="Capture micro wins, shifts, or sensations here. Saved locally for your eyes only."
        value={entry}
        onChange={(event) => setEntry(event.target.value)}
      />
    </div>
  );
}
