import { CheckCircle, XCircle, ExternalLink, FileText, Globe } from "lucide-react";

export default function PortfolioCard({ portfolio }: { portfolio?: any }) {
  if (!portfolio) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Configured</h2>
        <p className="text-gray-600">Submit your portfolio details to start monitoring</p>
      </div>
    );
  }
  
  const isLive = portfolio?.lastStatus === 200;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
          <p className="text-gray-600 mt-1">Your current portfolio configuration</p>
        </div>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
          isLive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {isLive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {isLive ? "Live" : "Offline"}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Specialization</label>
          <p className="text-gray-900 mt-1">{portfolio.domain || "Not specified"}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Portfolio URL</label>
          <div className="mt-1">
            {portfolio.url ? (
              <a 
                href={portfolio.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 underline"
              >
                <ExternalLink className="w-4 h-4" />
                {portfolio.url}
              </a>
            ) : (
              <span className="text-gray-500">Not provided</span>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Resume</label>
          <div className="mt-1">
            {portfolio.resumeUrl ? (
              <a 
                href={portfolio.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 underline"
              >
                <FileText className="w-4 h-4" />
                View Resume PDF
              </a>
            ) : (
              <span className="text-gray-500">Not uploaded</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
