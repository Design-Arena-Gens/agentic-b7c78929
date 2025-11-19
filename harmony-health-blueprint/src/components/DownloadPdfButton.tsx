'use client';

import { useState } from "react";

export function DownloadPdfButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/ebook", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Unable to generate PDF right now. Please retry.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Harmony-Health-Blueprint.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 print-hidden">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-full border border-[#caa36a]/70 bg-[#1d1c1a] px-6 py-3 text-xs uppercase tracking-[0.28em] text-white transition disabled:cursor-not-allowed disabled:bg-[#1d1c1a]/60 hover:shadow-[0_16px_48px_-32px_rgba(0,0,0,0.55)]"
      >
        {isLoading ? "Preparing PDF…" : "Download Minimalist PDF"}
      </button>
      {error ? (
        <p className="text-xs text-red-600">
          {error}
        </p>
      ) : null}
      <p className="text-xs uppercase tracking-[0.28em] text-[#4c4b48]">
        Screen-optimized - Printable planner included
      </p>
    </div>
  );
}
