// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import DashboardClient from "@/components/DashboardClient";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full text-center bg-white dark:bg-gray-900 border rounded-2xl p-10 shadow">
          <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please sign in to access your personalized dashboard and placement readiness tools.
          </p>
          <Link
            href="/api/auth/signin"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            aria-label="Sign in"
          >
            Sign in with GitHub
          </Link>
        </div>
      </main>
    );
  }

  // Server-side fetches: user profile + portfolio + basic analytics
  const portfolio = await prisma.portfolio.findUnique({ where: { userId: session.user.id } });
  // No activity model in schema; use empty array as placeholder
  const recentActivity: any[] = [];

  // Build checklist from portfolio shape (simple example)
  const checklist = [
    { label: "Scaffolded portfolio (template)", status: !!portfolio?.scaffolded },
    { label: "GitHub connected", status: !!portfolio?.github },
    { label: "Resume uploaded", status: !!portfolio?.resumeUrl },
    { label: "Portfolio health is OK", status: portfolio?.lastStatus === 200 },
  ];
  return <DashboardClient session={session} portfolio={portfolio} checklist={checklist} recentActivity={recentActivity} />;
}
