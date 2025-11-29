"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Branding - Left Aligned */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-green-400 font-mono font-bold text-xl tracking-wider">
              PRAP
            </span>
          </Link>

          {/* Navigation Links - Right Aligned */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/learn"
              className="text-gray-300 hover:text-green-400 font-mono text-sm font-medium transition-colors"
            >
              TUTORIALS
            </Link>
            <Link
              href="/roster"
              className="text-gray-300 hover:text-green-400 font-mono text-sm font-medium transition-colors"
            >
              ROSTER
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-green-400 font-mono text-sm font-medium transition-colors"
              >
                DASHBOARD
              </Link>
            )}
            {isLoggedIn && session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-red-400 hover:text-red-300 font-mono text-sm font-medium transition-colors"
              >
                ADMIN
              </Link>
            )}
            
            {/* Auth Control */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-mono">Welcome, {session?.user?.name || "User"}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-mono text-xs transition-colors"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded font-mono text-sm transition-colors"
              >
                LOGIN (GITHUB)
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/learn"
              className="text-gray-300 hover:text-green-400 block px-3 py-2 font-mono text-sm transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              TUTORIALS
            </Link>
            <Link
              href="/roster"
              className="text-gray-300 hover:text-green-400 block px-3 py-2 font-mono text-sm transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ROSTER
            </Link>
            {isLoggedIn && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-green-400 block px-3 py-2 font-mono text-sm transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                DASHBOARD
              </Link>
            )}
            {isLoggedIn && session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="text-red-400 hover:text-red-300 block px-3 py-2 font-mono text-sm transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ADMIN
              </Link>
            )}
            <div className="pt-2">
              {isLoggedIn ? (
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-mono">Welcome, {session?.user?.name || "User"}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="bg-red-600 hover:bg-red-700 text-white block px-3 py-2 rounded font-mono text-sm transition-colors"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white block px-3 py-2 rounded font-mono text-sm transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOGIN (GITHUB)
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;