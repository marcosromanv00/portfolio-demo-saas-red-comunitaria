import Link from "next/link";

export function FooterNav() {
  return (
    <div className="mt-12">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Volver al inicio
      </Link>
    </div>
  );
}   