"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === 'true') {
      setSuccessMessage('Account created successfully! Please sign in.');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await signIn('github', { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('GitHub login error:', error);
      setError('GitHub login failed. Please try again.');
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
              AUTHENTICATE_TO_PRAP
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Secure access to deployment pipeline
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded px-4 py-3">
              <p className="text-green-400 font-mono text-sm">{successMessage}</p>
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2">EMAIL</label>
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
              <label className="block text-gray-400 font-mono text-sm mb-2">PASSWORD</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-3 text-white font-mono focus:border-green-400 focus:outline-none"
                placeholder="Enter your password"
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
              {loading ? 'AUTHENTICATING...' : 'SIGN_IN'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-500 font-mono text-xs">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* GitHub OAuth Button */}
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-6 py-4 rounded-lg font-mono font-semibold transition-all duration-300 flex items-center justify-center gap-3 group mb-6"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="group-hover:text-green-400 transition-colors">
              SIGN IN WITH GITHUB
            </span>
          </button>

          {/* Register Link */}
          <div className="text-center mb-6">
            <p className="text-gray-400 font-mono text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-green-400 hover:text-green-300">
                CREATE_ACCOUNT
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg mb-6">
            <p className="text-gray-400 font-mono text-xs text-center leading-relaxed">
              Your login facilitates seamless deployment and verifies project ownership.
              <br />
              <span className="text-green-400">SECURE • ENCRYPTED • VERIFIED</span>
            </p>
          </div>

          <div className="text-center">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-green-400 font-mono text-sm transition-colors"
            >
              ← RETURN_TO_HOMEPAGE
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-mono text-xs">AUTH_SYSTEM_ONLINE</span>
        </div>
      </div>
    </div>
  );
}