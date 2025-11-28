import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white py-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PRAP</h1>
        <nav className="space-x-4 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/learn" className="hover:text-blue-600">
            Learn
          </Link>
          <Link href="/auth" className="hover:text-blue-600">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
