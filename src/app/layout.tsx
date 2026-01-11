import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://red-comunitaria-demo.vercel.app"),
  title: {
    default: "Red Comunitaria | Conectando Vecinos",
    template: "%s | Red Comunitaria",
  },
  description:
    "Plataforma líder para la gestión de solicitudes comunitarias. Conecta con tus vecinos, reporta necesidades y mejora tu comunidad.",
  keywords: [
    "comunidad",
    "vecinos",
    "ayuda",
    "gestión",
    "voluntariado",
    "barrio",
  ],
  authors: [{ name: "Red Comunitaria Team" }],
  creator: "Red Comunitaria",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://red-comunitaria-demo.vercel.app",
    title: "Red Comunitaria | Conectando Vecinos",
    description:
      "Ayuda a tu comunidad gestionando y resolviendo solicitudes vecinales.",
    siteName: "Red Comunitaria",
  },
  twitter: {
    card: "summary_large_image",
    title: "Red Comunitaria | Conectando Vecinos",
    description:
      "Ayuda a tu comunidad gestionando y resolviendo solicitudes vecinales.",
    creator: "@redcomunitaria",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary flex flex-col",
          inter.variable,
          outfit.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
