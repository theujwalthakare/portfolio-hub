"use client";
import { useState } from "react";
import { CheckCircle, XCircle, Globe, RefreshCw } from "lucide-react";

type Check = { timestamp: string; statusCode: number };

type Props = {
  url?: string;
  status?: number | null;
  lastChecked?: string | null;
  history?: Check[];
  onRecheck?: () => Promise<void> | void;
};

export default function HealthMonitorWidget({ url = "", status = null, lastChecked = null, history = [], onRecheck }: Props) {
  const [loading, setLoading] = useState(false);
  const isHealthy = status === 200;

  async function handleRecheck() {
    try {
      setLoading(true);
      await onRecheck?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Health</h2>
          <p className="text-gray-600 mt-1">Monitor your portfolio's uptime and performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isHealthy ? "bg-green-100 text-green-700" : status ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
          }`}>
            {isHealthy ? (
              <CheckCircle className="w-4 h-4" />
            ) : status ? (
              <XCircle className="w-4 h-4" />
            ) : (
              <Globe className="w-4 h-4" />
            )}
            {status ? `${status} ${isHealthy ? "Online" : "Offline"}` : "Not monitored"}
          </div>
          
          <button
            onClick={handleRecheck}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Checking..." : "Check Now"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Portfolio URL</label>
          <div className="mt-1">
            {url ? (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 underline break-all"
              >
                {url}
              </a>
            ) : (
              <span className="text-gray-500">No URL configured</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Last Checked</label>
            <p className="text-gray-900 mt-1">
              {lastChecked ? new Date(lastChecked).toLocaleString() : "Never"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status Code</label>
            <p className="text-gray-900 mt-1">{status || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}