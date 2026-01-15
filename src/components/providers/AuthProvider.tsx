"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initAuth = async () => {
      console.log("AuthProvider: Iniciando verificación de auth...");

      // Intentamos obtener la sesión actual
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error(
          "AuthProvider: Error al obtener la sesión:",
          sessionError
        );
        return;
      }

      if (session) {
        console.log(
          "AuthProvider: Sesión existente encontrada para el usuario:",
          session.user.id
        );
        return;
      }

      // Si no hay sesión, iniciamos sesión de forma anónima
      console.log("AuthProvider: No hay sesión. Intentando login anónimo...");
      const { data, error: signInError } =
        await supabase.auth.signInAnonymously();

      if (signInError) {
        console.error(
          "AuthProvider: Error al iniciar sesión anónima:",
          signInError
        );
      } else if (data.session) {
        console.log(
          "AuthProvider: Login anónimo exitoso. Nuevo Usuario:",
          data.session.user.id
        );
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}
