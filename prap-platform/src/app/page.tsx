"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Batch Roster Table Component with real database data
const BatchRosterTable = ({ students }: { students: any[] }) => {
  const [filter, setFilter] = useState('All Domains');
  
  const filteredData = filter === 'All Domains' 
    ? students 
    : students.filter(student => student.portfolio?.domain === filter);
    
  const stats = {
    total: students.length,
    live: students.filter((s: any) => s.portfolio?.lastStatus === 200).length,
    pending: students.filter((s: any) => !s.portfolio).length,
    broken: students.filter((s: any) => s.portfolio?.lastStatus === 404).length
  };
  
  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-gray-400 text-sm font-mono">TOTAL</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
          <div className="text-2xl font-bold text-green-400">{stats.live}</div>
          <div className="text-gray-400 text-sm font-mono">LIVE</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500/30">
          <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          <div className="text-gray-400 text-sm font-mono">PENDING</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{stats.broken}</div>
          <div className="text-gray-400 text-sm font-mono">BROKEN</div>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-green-400 font-mono font-bold">LIVE_BATCH_STATUS</h3>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm text-white"
          >
            <option>All Domains</option>
            <option>Cloud/DevOps</option>
            <option>Data Science</option>
            <option>Full Stack</option>
            <option>AI/ML</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800">
              <tr className="text-left">
                <th className="p-3 text-gray-400 font-mono">STUDENT</th>
                <th className="p-3 text-gray-400 font-mono hidden md:table-cell">DOMAIN</th>
                <th className="p-3 text-gray-400 font-mono hidden lg:table-cell">PORTFOLIO</th>
                <th className="p-3 text-gray-400 font-mono">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, 6).map((student: any) => {
                const isHealthy = student.portfolio?.lastStatus === 200;
                const hasIssues = student.portfolio?.lastStatus === 404;
                const isPending = !student.portfolio;
                
                return (
                  <tr key={student.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {student.name?.[0] || "U"}
                        </div>
                        <div>
                          <div className="text-white font-mono font-semibold">{student.name || "Unknown"}</div>
                          <div className="text-gray-400 text-xs">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400 hidden md:table-cell font-mono">{student.portfolio?.domain || "Not set"}</td>
                    <td className="p-3 hidden lg:table-cell">
                      {student.portfolio?.url ? (
                        <a href={student.portfolio.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-mono text-xs">
                          {student.portfolio.url.replace('https://', '').replace('http://', '')}
                        </a>
                      ) : (
                        <span className="text-gray-500 font-mono text-xs">Not submitted</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-mono ${
                        isHealthy ? 'bg-green-500/20 text-green-400' :
                        isPending ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {isHealthy ? '🟢 LIVE' :
                         isPending ? '🟡 PENDING' : '🔴 BROKEN'}
                        {student.portfolio?.lastStatus && (
                          <span className="ml-1">({student.portfolio.lastStatus})</span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// CI/CD Loop steps
const cicdSteps = [
  { id: "commit", label: "COMMIT", desc: "Push code changes", active: true },
  { id: "deploy", label: "DEPLOY", desc: "Auto-deployment", active: false },
  { id: "validate", label: "VALIDATE", desc: "Health monitoring", active: false },
  { id: "refine", label: "REFINE", desc: "AI assistance", active: false, isAI: true }
];

// Portfolio Health Monitor Component
const HealthMonitor = () => {
  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6 font-mono max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-green-400 text-sm">PORTFOLIO_STATUS</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-400 font-bold">200 OK</span>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">URL:</span>
          <span className="text-white">portfolio.vercel.app</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">UPTIME:</span>
          <span className="text-green-400">99.9%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">LAST_CHECK:</span>
          <span className="text-white">2s ago</span>
        </div>
      </div>
    </div>
  );
};

// CI/CD Loop Component
const CICDLoop = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % cicdSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
      {cicdSteps.map((step, i) => (
        <div key={step.id} className="flex flex-col md:flex-row items-center">
          <div className={`relative p-4 md:p-6 rounded-lg border-2 transition-all duration-500 ${
            i === activeStep 
              ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20' 
              : 'border-gray-700 bg-gray-900/50'
          }`}>
            <div className="text-center">
              <div className={`text-lg md:text-xl font-mono font-bold mb-2 ${
                i === activeStep ? 'text-green-400' : 'text-gray-400'
              }`}>
                {step.label}
                {step.isAI && ' 🤖'}
              </div>
              <div className="text-xs md:text-sm text-gray-500">{step.desc}</div>
            </div>
            {i === activeStep && (
              <div className="absolute inset-0 border-2 border-green-500 rounded-lg animate-pulse" />
            )}
          </div>
          {i < cicdSteps.length - 1 && (
            <div className="hidden md:block w-8 h-0.5 bg-gray-700 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};



// Sticky Navigation Component
const StickyNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800 p-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-green-400 font-mono text-sm">PRAP_SYSTEM_READY</span>
        <div className="flex gap-4">
          <Link 
            href="/learn" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-sm transition-colors"
          >
            TUTORIALS
          </Link>
          <Link 
            href="/roster" 
            className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 rounded font-mono text-sm transition-colors"
          >
            ROSTER
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Fetch real data from database
async function getStudents() {
  try {
    const response = await fetch('/api/students', { cache: 'no-store' });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

export default function Home() {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    getStudents().then(setStudents);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Sticky Navigation */}
      <StickyNav />

      {/* 1. Hero Section: Automated Readiness */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-black leading-tight mb-6">
              <span className="text-green-400">AUTOMATED</span>
              <br />
              <span className="text-white">READINESS.</span>
              <br />
              <span className="text-blue-400">ZERO FRICTION</span>
              <br />
              <span className="text-white">DEPLOYMENT.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Build, monitor, and deploy your career assets with 
              <span className="text-green-400 font-semibold"> industrial precision</span> using our 
              <span className="text-blue-400 font-semibold">real-time validation engine</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/learn" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono font-bold transition-colors"
              >
                SEE TECHNICAL TUTORIALS
              </Link>
              <Link 
                href="/roster" 
                className="px-6 py-3 border border-green-500 text-green-400 hover:bg-green-500/10 rounded font-mono font-bold transition-colors"
              >
                VIEW LIVE BATCH ROSTER
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <HealthMonitor />
          </motion.div>
        </div>
      </section>

      {/* 2. CI/CD Learning Loop */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-green-400 mb-4">
              THE CONTINUOUS LEARNING LOOP
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Automated workflow with integrated AI assistance
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CICDLoop />
          </motion.div>
        </div>
      </section>

      {/* 3. Live Batch Observability */}
      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-green-400 mb-4">
              LIVE BATCH OBSERVABILITY
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              Real-time monitoring and transparency
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <BatchRosterTable students={students} />
          </motion.div>
          
          <div className="text-center">
            <Link 
              href="/roster" 
              className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-mono font-bold transition-colors"
            >
              VIEW FULL ROSTER ANALYTICS
            </Link>
          </div>
        </div>
      </section>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-green-400 font-mono font-bold">SYSTEM_STATUS: OPERATIONAL</p>
            <p className="text-gray-400 text-sm">Ready for deployment</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/learn" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-sm transition-colors"
            >
              TUTORIALS
            </Link>
            <Link 
              href="/roster" 
              className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 rounded font-mono text-sm transition-colors"
            >
              ROSTER
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}