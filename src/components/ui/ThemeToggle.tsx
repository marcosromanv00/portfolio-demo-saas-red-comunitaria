"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Cambiar tema"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-500 transition-all hover:rotate-90" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-600 transition-all hover:-rotate-12" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
