import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Twitter, Mail, Heart } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Solicitudes", href: "/requests" },
  { name: "Reportar Problema", href: "#" },
  { name: "Privacidad", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xl supports-[backdrop-filter]:bg-background/20 mt-auto">
      <div className="container mx-auto max-w-screen-xl py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold font-heading text-lg shadow-lg shadow-primary/25">
                R
              </div>
              <span className="font-heading text-xl font-bold">
                RedComunitaria
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Plataforma digital para la gestión y resolución colaborativa de
              necesidades en nuestra comunidad. Juntos construimos un mejor
              lugar para vivir.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-primary/80">
              Plataforma
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/requests"
                  className="hover:text-primary transition-colors"
                >
                  Solicitudes
                </Link>
              </li>
              <li>
                <Link
                  href="/new-request"
                  className="hover:text-primary transition-colors"
                >
                  Crear Solicitud
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Mapa Vecinal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-primary/80">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Términos de Uso
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Red Comunitaria Demo. Open Source.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
