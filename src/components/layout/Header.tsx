"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Solicitudes", href: "/requests" },
  { name: "Propuestas", href: "/proposals" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold font-heading text-lg shadow-lg shadow-primary/25">
              R
            </div>
            <span className="hidden font-heading text-lg font-bold sm:inline-block">
              RedComunitaria
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <Link href="/new-request">
              <Button size="sm" className="gap-2 shadow-primary/20">
                Nueva Solicitud
              </Button>
            </Link>
          </div>
          <ThemeToggle />
          <button
            className="md:hidden p-2 text-foreground/60 hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-4 bg-background">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-bold"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/new-request" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Nueva Solicitud</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
