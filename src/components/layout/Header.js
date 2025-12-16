// components/layout/Header.jsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Red Comunitaria
        </Link>

        <nav className="flex gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <Link href="/requests" className="hover:underline">
            Solicitudes
          </Link>
          <Link href="/new-request" className="hover:underline">
            Nueva solicitud
          </Link>
        </nav>
      </div>
    </header>
  );
}
