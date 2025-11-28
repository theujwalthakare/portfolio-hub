
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "PRAP — Professional Readiness Platform",
  description: "MCA 2025 Developer Enablement Platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <SessionProviderWrapper>
          <Header />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
