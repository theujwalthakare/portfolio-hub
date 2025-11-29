"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, ExternalLink } from "lucide-react";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const user = session?.user as { name?: string; email?: string; image?: string; github?: string } | undefined;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <Image
                src={user.image}
                alt={`${user.name ?? "Student"}'s avatar`}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-600">
                {user?.name?.[0] ?? "U"}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name ?? "Student"}
              </h1>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-gray-600">{user?.email}</span>
                {user?.github && (
                  <Link 
                    href={`https://github.com/${user.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Health Check
            </button>

            <Link
              href="/dashboard#portfolio-form"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Update Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}