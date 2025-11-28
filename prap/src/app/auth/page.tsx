"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">Login to PRAP</h1>
      <p className="text-gray-600">Authenticate to access your dashboard.</p>

      <Button label="Login with GitHub" onClick={() => signIn("github")} />
    </div>
  );
}
