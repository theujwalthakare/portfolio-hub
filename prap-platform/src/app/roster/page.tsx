"use client";
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Download, Search, Filter, ExternalLink } from "lucide-react";

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

export default function RosterPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState('All Domains');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    getStudents().then(data => {
      console.log('Roster - Received students:', data);
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredStudents = students
    .filter((student: any) => {
    const matchesDomain = domainFilter === 'All Domains' || student.portfolio?.domain === domainFilter;
    const matchesStatus = statusFilter === 'All Status' || 
      (statusFilter === 'LIVE' && student.portfolio?.lastStatus === 200) ||
      (statusFilter === 'PENDING' && !student.portfolio) ||
      (statusFilter === 'BROKEN' && student.portfolio?.lastStatus === 404);
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
      return matchesDomain && matchesStatus && matchesSearch;
    })
    .sort((a: any, b: any) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'domain':
          aValue = a.portfolio?.domain || '';
          bValue = b.portfolio?.domain || '';
          break;
        case 'status':
          aValue = a.portfolio?.lastStatus || 0;
          bValue = b.portfolio?.lastStatus || 0;
          break;
        default:
          return 0;
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const stats = {
    total: students.length,
    live: students.filter((s: any) => s.portfolio?.lastStatus === 200).length,
    pending: students.filter((s: any) => !s.portfolio).length,
    broken: students.filter((s: any) => s.portfolio?.lastStatus === 404).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mb-4"></div>
          <p className="text-green-400 font-mono text-lg">LOADING_BATCH_DATA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-400/20 border-2 border-green-400 rounded-full flex items-center justify-center">
              <span className="text-green-400 font-mono font-bold text-lg">🎓</span>
            </div>
            <h1 className="text-4xl font-mono font-bold text-green-400">
              MCA_2025_ROSTER
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-gray-400 font-mono text-sm">STUDENT SHOWCASE | PORTFOLIO GALLERY</p>
          </div>
        </div>

        {/* Student Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="text-3xl font-bold text-white font-mono">{stats.total}</div>
            <div className="text-gray-400 text-sm font-mono">TOTAL STUDENTS</div>
          </div>
          <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-400 font-mono">{stats.live}</div>
            <div className="text-gray-400 text-sm font-mono">LIVE PORTFOLIOS</div>
          </div>
          <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-400 font-mono">{students.filter((s: any) => s.portfolio?.domain).length}</div>
            <div className="text-gray-400 text-sm font-mono">SPECIALIZATIONS</div>
          </div>
        </div>

        {/* Data Filters & Search */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">DOMAIN FILTER</label>
              <select 
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-sm"
              >
                <option>All Domains</option>
                <option>Cloud/DevOps</option>
                <option>Data Science</option>
                <option>Full Stack</option>
                <option>AI/ML</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">PORTFOLIO STATUS</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-sm"
              >
                <option>All Students</option>
                <option>LIVE</option>
                <option>PENDING</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 font-mono text-sm mb-2">STUDENT LOOKUP</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-10 py-2 text-white font-mono text-sm placeholder-gray-500 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Status Grid - Main Table */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-green-400 font-mono font-bold text-lg">STUDENT_SHOWCASE</h3>
            <p className="text-gray-400 font-mono text-sm">Showing {sortedAndFilteredStudents.length} of {students.length} students</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4 text-left text-gray-400 font-mono text-sm cursor-pointer hover:text-green-400 transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-2">
                      NAME
                      {sortField === 'name' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-400 font-mono text-sm hidden md:table-cell cursor-pointer hover:text-green-400 transition-colors" onClick={() => handleSort('domain')}>
                    <div className="flex items-center gap-2">
                      DOMAIN_FOCUS
                      {sortField === 'domain' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-400 font-mono text-sm hidden lg:table-cell">PORTFOLIO_LINK</th>
                  <th className="p-4 text-left text-gray-400 font-mono text-sm cursor-pointer hover:text-green-400 transition-colors" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-2">
                      HEALTH_STATUS
                      {sortField === 'status' && (sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </div>
                  </th>
                  <th className="p-4 text-left text-gray-400 font-mono text-sm hidden xl:table-cell">PORTFOLIO_LINK</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredStudents.map((student: any) => {
                  const isHealthy = student.portfolio?.lastStatus === 200;
                  const isPending = !student.portfolio;
                  const isBroken = student.portfolio?.lastStatus === 404;
                  
                  return (
                    <tr key={student.id} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {student.name?.[0] || "U"}
                          </div>
                          <div>
                            <div className="text-white font-mono font-semibold">{student.name || "Unknown"}</div>
                            <div className="text-gray-400 text-xs font-mono">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300 font-mono text-sm hidden md:table-cell">
                        {student.portfolio?.domain || "Not specified"}
                      </td>
                      <td className="p-4 hidden lg:table-cell">
                        {student.portfolio?.url ? (
                          <a 
                            href={student.portfolio.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 font-mono text-sm underline"
                          >
                            {student.portfolio.url.replace('https://', '').replace('http://', '')}
                          </a>
                        ) : (
                          <span className="text-gray-500 font-mono text-sm">Not submitted</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          isHealthy ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          isPending ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {isHealthy ? '🟢 LIVE' :
                           isPending ? '🟡 PENDING' : '🔴 BROKEN'}
                          {student.portfolio?.lastStatus && (
                            <span className="ml-1">({student.portfolio.lastStatus})</span>
                          )}
                        </span>
                      </td>
                      <td className="p-4 hidden xl:table-cell">
                        {student.portfolio?.url ? (
                          <a 
                            href={student.portfolio.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-mono text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            VIEW_PORTFOLIO
                          </a>
                        ) : (
                          <span className="text-gray-500 font-mono text-sm">Coming Soon</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {sortedAndFilteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-mono">No students match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}