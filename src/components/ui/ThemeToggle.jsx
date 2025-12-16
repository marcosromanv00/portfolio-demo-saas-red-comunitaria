/**
 * ThemeToggle
 *
 * Responsabilidad única:
 * - Alternar entre tema claro y oscuro
 *
 * Decisiones de diseño:
 * - NO usa useEffect con setState (evita error ESLint)
 * - El DOM es la fuente de verdad (data-theme)
 * - localStorage solo persiste el valor
 *
 * Cumple:
 * - ESLint (react-hooks)
 * - Clean Code
 * - SOLID (SRP)
 */

export default function ThemeToggle() {
  /**
   * Obtiene el tema actual directamente del DOM.
   * Esto evita tener estado duplicado en React.
   */
  const getCurrentTheme = () =>
    document.documentElement.getAttribute("data-theme") || "light";

  /**
   * Alterna el tema:
   * - Calcula el siguiente tema
   * - Actualiza el DOM
   * - Guarda en localStorage
   */
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    // Aplicamos el tema al DOM (fuente de verdad)
    document.documentElement.setAttribute("data-theme", nextTheme);

    // Persistimos preferencia
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      🌓
    </button>
  );
}
