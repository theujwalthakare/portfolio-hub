

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import { ReactNode } from "react";
// Placeholder imports for new features (to be implemented)
// import SideNav from "@/components/SideNav";
// import ToastProvider from "@/components/ToastProvider";
// import ModalManager from "@/components/ModalManager";
// import SkeletonLoader from "@/components/SkeletonLoader";
// import ErrorBoundary from "@/components/ErrorBoundary";
// import ThemeToggle from "@/components/ThemeToggle";
// import CookieBanner from "@/components/CookieBanner";
// import { AnimatePresence, motion } from "framer-motion";

export const metadata: Metadata = {
  title: "PRAP | MCA 2025 Professional Readiness & Automation Platform",
  description:
    "Student dashboard for portfolio health, progress, and placement readiness. Accessible, professional, and minimal design.",
  openGraph: {
    title: "Dashboard — PRAP | MCA 2025",
    description:
      "Centralize your portfolio health, progress, and next steps for placement readiness. Built for accessibility and performance.",
    url: "https://prap.mca2025.edu/dashboard",
    type: "website",
    images: [
      {
        url: "/og-dashboard.png",
        width: 1200,
        height: 630,
        alt: "PRAP Dashboard OG Image",
      },
    ],
  },
  alternates: {
    canonical: "https://prap.mca2025.edu/dashboard",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen">
        <SessionProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
