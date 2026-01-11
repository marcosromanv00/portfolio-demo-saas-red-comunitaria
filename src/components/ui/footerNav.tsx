import Link from "next/link";

export function FooterNav() {
  return (
    <div className="flex justify-center gap-4 mt-8 py-4 border-t border-gray-100 dark:border-gray-800 text-sm opacity-60">
      <Link href="/" className="hover:underline">
        Inicio
      </Link>
      <span>•</span>
      <Link href="/requests" className="hover:underline">
        Solicitudes
      </Link>
      <span>•</span>
      <Link href="/new-request" className="hover:underline">
        Nueva Solicitud
      </Link>
    </div>
  );
}
