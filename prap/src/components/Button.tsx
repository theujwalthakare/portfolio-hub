"use client";

import type { MouseEventHandler } from "react";

type ButtonProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export default function Button({ label, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
    >
      {label}
    </button>
  );
}
