"use client";
import { useState, useTransition } from "react";
import { Loader2, Save, ExternalLink, Upload, X } from "lucide-react";

type Props = {
  userId: string;
};

export default function PortfolioForm({ userId }: Props) {
  const [domain, setDomain] = useState("");
  const [url, setUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState("");
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/portfolio/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, domain, url, resumeUrl: resumeBase64 }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          throw new Error(json?.error?.message || "Failed to save portfolio");
        }
        setFeedback({ type: "success", message: "Portfolio saved successfully!" });
      } catch (err: any) {
        setFeedback({ type: "error", message: err.message || "An error occurred." });
      }
    });
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-mono font-semibold text-white">Portfolio Setup</h2>
        <p className="text-gray-400 font-mono mt-1">Configure your portfolio details for monitoring</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
            Domain/Specialization
          </label>
          <input 
            value={domain} 
            onChange={(e) => setDomain(e.target.value)} 
            placeholder="e.g. Full-stack Development, Data Science" 
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
            Portfolio URL *
          </label>
          <div className="flex gap-3">
            <input 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://your-portfolio.vercel.app" 
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors font-mono" 
              type="url" 
              required 
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  await fetch("/api/portfolio/health?url=" + encodeURIComponent(url));
                  alert("Health check initiated");
                } catch {
                  alert("Unable to perform health check");
                }
              }}
              className="px-4 py-3 bg-gray-800 border border-gray-600 hover:border-gray-500 text-gray-300 rounded-lg inline-flex items-center gap-2 transition-colors font-mono"
            >
              <ExternalLink className="w-4 h-4" />
              Test
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono font-medium text-gray-300 mb-2">
            Resume PDF (Max 2MB)
          </label>
          <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer">
            {resumeFile ? (
              <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">PDF</span>
                  </div>
                  <span className="text-sm text-gray-300 font-mono">{resumeFile.name}</span>
                  <span className="text-xs text-gray-500 font-mono">({(resumeFile.size / 1024 / 1024).toFixed(1)}MB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setResumeFile(null); setResumeBase64(""); }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-mono mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 font-mono">PDF files only, max 2MB</p>
              </div>
            )}
            <input
              type="file"
              accept=".pdf"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (file.size > 2 * 1024 * 1024) {
                  setFeedback({ type: "error", message: "File size must be less than 2MB" });
                  return;
                }
                setResumeFile(file);
                const reader = new FileReader();
                reader.onload = () => setResumeBase64(reader.result as string);
                reader.readAsDataURL(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-lg font-mono ${
            feedback.type === "success" 
              ? "bg-green-900/20 text-green-400 border border-green-500/30" 
              : "bg-red-900/20 text-red-400 border border-red-500/30"
          }`}>
            {feedback.message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-3 rounded-lg font-mono font-medium inline-flex items-center justify-center gap-2 transition-colors"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isPending ? "Saving..." : "Save Portfolio"}
        </button>
      </form>
    </div>
  );
}