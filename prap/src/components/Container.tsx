import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">{children}</div>
  );
}
