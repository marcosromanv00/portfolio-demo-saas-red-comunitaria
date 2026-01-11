"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Solicitudes", href: "/requests" },
  { label: "Crear", href: "/new-request" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? "nav-link active" : "nav-link"}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
