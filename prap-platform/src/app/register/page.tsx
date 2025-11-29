"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    domain: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          domain: formData.domain
        })
      });

      if (response.ok) {
        window.location.href = '/login?registered=true';
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center pt-16">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-md w-full mx-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-mono font-bold text-green-400 mb-2">
              CREATE_PRAP_ACCOUNT
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Join the deployment pipeline
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">FULL_NAME</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">EMAIL_ADDRESS</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">DOMAIN_FOCUS</label>
              <select
                required
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
              >
                <option value="">Select your domain</option>
                <option value="Cloud/DevOps">Cloud/DevOps</option>
                <option value="Data Science">Data Science</option>
                <option value="Full Stack">Full Stack</option>
                <option value="AI/ML">AI/ML</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">PASSWORD</label>
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">CONFIRM_PASSWORD</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
                placeholder="Re-enter password"
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded px-4 py-3">
                <p className="text-red-400 font-mono text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-4 rounded-lg font-mono font-semibold transition-colors"
            >
              {loading ? 'CREATING_ACCOUNT...' : 'CREATE_ACCOUNT'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 font-mono text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-green-400 hover:text-green-300">
                SIGN_IN
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-mono text-xs">REGISTRATION_SYSTEM_ONLINE</span>
        </div>
      </div>
    </div>
  );
}