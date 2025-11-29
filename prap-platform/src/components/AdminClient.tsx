"use client";
import { useState, useEffect } from "react";
import { Settings, Users, Database, Shield, Activity, Terminal, Download, Search, Filter, Trash2, Edit, Eye, EyeOff } from "lucide-react";

export default function AdminClient({ session, students, systemStats }: any) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  console.log('AdminClient props:', { session: session?.user, studentsCount: students?.length, systemStats });

  const filteredStudents = students.filter((student: any) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
    // TODO: Implement bulk actions
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
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-4xl font-mono font-bold text-red-500">
              ADMIN_CONTROL_PANEL
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 font-mono text-sm">
              PRIVILEGED_ACCESS | ADMIN: {session?.user?.name || "SYSTEM"}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          {[
            { id: "overview", label: "SYSTEM_OVERVIEW", icon: Activity },
            { id: "users", label: "USER_MANAGEMENT", icon: Users },
            { id: "database", label: "DATABASE_ADMIN", icon: Database },
            { id: "config", label: "SITE_CONFIG", icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'text-red-500 border-b-2 border-red-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl font-bold text-white font-mono">{systemStats.totalUsers}</div>
                <div className="text-gray-400 text-sm font-mono">TOTAL USERS</div>
              </div>
              <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-green-400 font-mono">{systemStats.livePortfolios}</div>
                <div className="text-gray-400 text-sm font-mono">LIVE PORTFOLIOS</div>
              </div>
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-red-400 font-mono">{systemStats.errorPortfolios}</div>
                <div className="text-gray-400 text-sm font-mono">ERROR PORTFOLIOS</div>
              </div>
              <div className="bg-gray-900 border border-blue-500/30 rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 font-mono">
                  {Math.round((systemStats.livePortfolios / systemStats.totalPortfolios) * 100) || 0}%
                </div>
                <div className="text-gray-400 text-sm font-mono">SUCCESS RATE</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-red-500 font-mono font-bold text-lg mb-4">SYSTEM_ACTIVITY</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-mono">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Portfolio health check completed - {new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">New user registration - {students[students.length - 1]?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-mono">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Database backup scheduled - Next: 02:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            {/* User Management Controls */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-red-500 font-mono font-bold text-lg">USER_MANAGEMENT</h3>
                <div className="flex items-center gap-3">
                  {selectedUsers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBulkAction("delete")}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded font-mono text-sm"
                      >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        DELETE ({selectedUsers.length})
                      </button>
                      <button
                        onClick={() => handleBulkAction("export")}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-mono text-sm"
                      >
                        <Download className="w-4 h-4 inline mr-1" />
                        EXPORT
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-10 py-2 text-white font-mono text-sm"
                />
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="p-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredStudents.map((s: any) => s.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="p-3 text-left text-gray-400 font-mono text-sm">USER</th>
                      <th className="p-3 text-left text-gray-400 font-mono text-sm">EMAIL</th>
                      <th className="p-3 text-left text-gray-400 font-mono text-sm">PORTFOLIO</th>
                      <th className="p-3 text-left text-gray-400 font-mono text-sm">STATUS</th>
                      <th className="p-3 text-left text-gray-400 font-mono text-sm">ROLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student: any) => (
                      <tr key={student.id} className="border-t border-gray-700 hover:bg-gray-800/50">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(student.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, student.id]);
                              } else {
                                setSelectedUsers(selectedUsers.filter(id => id !== student.id));
                              }
                            }}
                            className="rounded"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {student.name?.[0] || "U"}
                            </div>
                            <span className="text-white font-mono">{student.name || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="p-3 text-gray-300 font-mono text-sm">{student.email}</td>
                        <td className="p-3 text-gray-300 font-mono text-sm">
                          {student.portfolio?.url ? (
                            <a href={student.portfolio.url} target="_blank" className="text-blue-400 hover:text-blue-300">
                              {student.portfolio.url.substring(0, 30)}...
                            </a>
                          ) : (
                            "Not submitted"
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded text-xs font-mono ${
                            student.portfolio?.lastStatus === 200 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {student.portfolio?.lastStatus === 200 ? 'LIVE' : 'OFFLINE'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <select
                              value={student.role}
                              onChange={async (e) => {
                                try {
                                  await fetch('/api/admin/users', {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ userId: student.id, role: e.target.value })
                                  });
                                  window.location.reload();
                                } catch (error) {
                                  console.error('Failed to update role:', error);
                                }
                              }}
                              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white font-mono text-xs"
                            >
                              <option value="STUDENT">STUDENT</option>
                              <option value="FACULTY">FACULTY</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "database" && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-red-500 font-mono font-bold text-lg mb-4">DATABASE_OPERATIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-left transition-colors">
                  <div className="text-green-400 font-mono font-bold">BACKUP_DATABASE</div>
                  <div className="text-gray-400 text-sm font-mono">Create full system backup</div>
                </button>
                <button className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-left transition-colors">
                  <div className="text-blue-400 font-mono font-bold">EXPORT_USERS</div>
                  <div className="text-gray-400 text-sm font-mono">Export user data to CSV</div>
                </button>
                <button className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-left transition-colors">
                  <div className="text-yellow-400 font-mono font-bold">HEALTH_CHECK</div>
                  <div className="text-gray-400 text-sm font-mono">Run system health diagnostics</div>
                </button>
                <button className="p-4 bg-gray-800 hover:bg-gray-700 border border-red-600 rounded text-left transition-colors">
                  <div className="text-red-400 font-mono font-bold">RESET_PORTFOLIOS</div>
                  <div className="text-gray-400 text-sm font-mono">Reset all portfolio status</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-red-500 font-mono font-bold text-lg mb-4">SITE_CONFIGURATION</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 font-mono text-sm mb-2">SITE_TITLE</label>
                  <input
                    type="text"
                    defaultValue="PRAP | MCA 2025"
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-sm mb-2">MAINTENANCE_MODE</label>
                  <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-sm">
                    <option>DISABLED</option>
                    <option>ENABLED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-mono text-sm mb-2">REGISTRATION_STATUS</label>
                  <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-sm">
                    <option>OPEN</option>
                    <option>CLOSED</option>
                    <option>INVITE_ONLY</option>
                  </select>
                </div>
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-mono text-sm">
                  SAVE_CONFIGURATION
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}