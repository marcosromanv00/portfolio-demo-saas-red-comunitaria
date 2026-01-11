import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Red Comunitaria Demo",
  description:
    "Plataforma para gestionar solicitudes de ayuda comunitaria de forma organizada y eficiente.",
  keywords: ["comunidad", "solicitudes", "ayuda", "gestión"],
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
          "min-h-screen bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary",
          inter.variable,
          outfit.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
