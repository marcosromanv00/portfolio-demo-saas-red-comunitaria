"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initAuth = async () => {
      // Intentamos obtener la sesión actual
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError);
        return;
      }

      // Si no hay sesión, iniciamos sesión de forma anónima
      if (!session) {
        const { error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError) {
          console.error("Error al iniciar sesión anónima:", signInError);
        }
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}
