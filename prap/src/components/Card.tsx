import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-5">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      {children}
    </div>
  );
}
