"use client";
import PortfolioForm from "@/components/PortfolioForm";
import Link from "next/link";
import { ExternalLink, CheckCircle, XCircle, Clock, Activity, Terminal, Zap, RefreshCw, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardClient({ session, portfolio, checklist, recentActivity }: any) {
  const [displayedText, setDisplayedText] = useState("");
  const username = session?.user?.name || "USER";
  const fullText = `${username.toUpperCase()}_DASHBOARD`;

  useEffect(() => {
    let charIndex = 0;
    
    const typeWriter = () => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeWriter, 30);
      }
    };
    
    typeWriter();
  }, [fullText]);
  const getStatusColor = (status: number) => {
    if (status === 200) return "text-green-400";
    if (status >= 400) return "text-red-400";
    return "text-yellow-400";
  };

  const getStatusIcon = (status: number) => {
    if (status === 200) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (status >= 400) return <XCircle className="w-5 h-5 text-red-400" />;
    return <Clock className="w-5 h-5 text-yellow-400" />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border-2 border-green-400 ring-2 ring-green-400/20"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-400/20 border-2 border-green-400 flex items-center justify-center">
                <span className="text-green-400 font-mono font-bold text-sm">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <h1 className="text-4xl font-mono font-bold text-green-400">
              {displayedText}<span className="animate-pulse text-green-500">|</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 font-mono text-sm">
              SYSTEM_ONLINE | USER: {session?.user?.name || "AUTHENTICATED"}
              {session?.user?.role === "ADMIN" && (
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs">
                  <Shield className="w-3 h-3" />
                  ADMIN
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Monitor Widget */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-mono font-bold text-white">PORTFOLIO_HEALTH</h2>
                  <p className="text-gray-400 font-mono mt-1">Monitor uptime and performance metrics</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono ${
                    portfolio?.lastStatus === 200 ? "bg-green-500/20 text-green-400 border border-green-500/30" : 
                    portfolio?.lastStatus ? "bg-red-500/20 text-red-400 border border-red-500/30" : 
                    "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}>
                    {getStatusIcon(portfolio?.lastStatus || 0)}
                    {portfolio?.lastStatus ? `${portfolio.lastStatus} ${portfolio.lastStatus === 200 ? "ONLINE" : "OFFLINE"}` : "NOT_MONITORED"}
                  </div>
                  
                  <button
                    onClick={async () => {
                      if (portfolio?.url) {
                        try {
                          await fetch("/api/portfolio/health?url=" + encodeURIComponent(portfolio.url));
                        } catch (e) {}
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-mono transition-colors"
                  >
                    <Activity className="w-4 h-4" />
                    CHECK_NOW
                  </button>
                </div>
              </div>

              <div className="bg-black border border-gray-600 rounded p-4">
                <div className="text-green-400 font-mono text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">URL:</span>
                    <span>{portfolio?.url || "NOT_CONFIGURED"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">LAST_CHECK:</span>
                    <span>{portfolio?.updatedAt ? new Date(portfolio.updatedAt).toLocaleString() : "NEVER"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">STATUS_CODE:</span>
                    <span>{portfolio?.lastStatus || "—"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Overview Card */}
            {portfolio && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-mono font-bold text-white">PORTFOLIO_OVERVIEW</h2>
                    <p className="text-gray-400 font-mono mt-1">Current configuration and assets</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono ${
                    portfolio.lastStatus === 200 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {portfolio.lastStatus === 200 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    {portfolio.lastStatus === 200 ? "LIVE" : "OFFLINE"}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black border border-gray-600 rounded p-4">
                    <label className="text-sm font-mono text-gray-500 block mb-2">SPECIALIZATION</label>
                    <p className="text-green-400 font-mono">{portfolio.domain || "GENERAL"}</p>
                  </div>
                  
                  <div className="bg-black border border-gray-600 rounded p-4">
                    <label className="text-sm font-mono text-gray-500 block mb-2">PORTFOLIO_URL</label>
                    {portfolio.url ? (
                      <a 
                        href={portfolio.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-mono text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        VIEW_LIVE
                      </a>
                    ) : (
                      <span className="text-gray-500 font-mono">NOT_PROVIDED</span>
                    )}
                  </div>
                  
                  <div className="bg-black border border-gray-600 rounded p-4 md:col-span-2">
                    <label className="text-sm font-mono text-gray-500 block mb-2">RESUME_STATUS</label>
                    {portfolio.resumeUrl ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-mono text-sm">UPLOADED_AND_READY</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-mono text-sm">NOT_UPLOADED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Progress Checklist */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-mono font-bold text-white mb-4">DEPLOYMENT_CHECKLIST</h2>
              <div className="space-y-3">
                {checklist.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.status ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-600" />
                    )}
                    <span className={`font-mono text-sm ${
                      item.status ? "text-green-400" : "text-gray-500"
                    }`}>
                      {item.label.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Form */}
            {!portfolio && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-mono font-bold text-white mb-4">INITIALIZE_PORTFOLIO</h2>
                <div className="bg-black p-6 rounded">
                  <PortfolioForm userId={session.user.id} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono font-bold text-white mb-4">QUICK_ACTIONS</h3>
              <div className="space-y-3">
                <Link href="/learn" className="block w-full text-left px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-mono text-sm transition-colors">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    START_LEARNING_PATH
                  </span>
                </Link>
                <Link href="/admin" className="block w-full text-left px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-mono text-sm transition-colors">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    ADMIN_PANEL
                  </span>
                </Link>
                <a href="https://vercel.com/import" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded font-mono text-sm transition-colors">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    DEPLOY_TO_VERCEL
                  </span>
                </a>
                <a href="/resume-template.pdf" className="block w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded font-mono text-sm transition-colors">
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    RESUME_TEMPLATE
                  </span>
                </a>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono font-bold text-white mb-4">SYSTEM_STATUS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">MONITORING</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono text-xs">ACTIVE</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">DEPLOYMENT</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono text-xs">READY</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-mono text-sm">VALIDATION</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-mono text-xs">ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-mono font-bold text-white mb-4">ACTIVITY_LOG</h3>
              {recentActivity.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500 font-mono text-sm">NO_RECENT_ACTIVITY</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((a: any) => (
                    <div key={a.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm font-mono text-white">{a.title}</p>
                        <p className="text-xs font-mono text-gray-500">{new Date(a.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}