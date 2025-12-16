import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  /**
   * Inicializa el tema UNA SOLA VEZ al cargar la app.
   * No usa estado, no rompe ESLint.
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      // Tema por defecto
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  return <Component {...pageProps} />;
}
