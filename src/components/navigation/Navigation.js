// src/components/layout/Navigation.tsx

import Link from "next/link";
import { useRouter } from "next/router";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Solicitudes", href: "/requests" },
  { label: "Crear", href: "/new-request" },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="nav">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            router.pathname === item.href ? "nav-link active" : "nav-link"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
