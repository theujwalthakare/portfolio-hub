"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">PRAP: Professional Readiness Platform</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Automating professional readiness, portfolio deployment, and analytics for MCA 2025.
        </p>
        <Button label="Get Started" onClick={() => (window.location.href = "/auth")} />
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card title="Automated Deployment">CI/CD setup and portfolio validation.</Card>
        <Card title="Learning Path">Guided tutorials for GitHub, hosting, resume.</Card>
        <Card title="Batch Dashboard">Real-time analytics for faculty/admin.</Card>
      </section>
    </div>
  );
}
