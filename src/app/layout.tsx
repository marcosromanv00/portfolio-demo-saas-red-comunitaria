import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
