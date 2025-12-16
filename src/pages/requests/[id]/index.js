import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/supabaseClient";

export default function RequestDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Obtiene una solicitud específica por ID.
   * useCallback garantiza estabilidad de referencia (SOLID + ESLint).
   */
  const fetchRequest = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("community_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setRequest(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /**
   * Ejecuta la consulta solo cuando el ID esté disponible.
   */
  useEffect(() => {
    if (id) fetchRequest();
  }, [id, fetchRequest]);

  /* ---------- Estados ---------- */

  if (loading) {
    return (
      <p className="mt-16 text-center text-lg text-gray-500 dark:text-gray-400">
        Cargando solicitud…
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-16 text-center text-lg text-red-600 dark:text-red-400">
        Error: {error}
      </p>
    );
  }

  if (!request) {
    return (
      <p className="mt-16 text-center text-lg text-red-600">
        No se encontró la solicitud.
      </p>
    );
  }

  /* ---------- UI ---------- */

  return (
    <main className="flex justify-center px-4 py-12">
      <section className="w-full max-w-2xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-lg p-8">
        {/* Título */}
        <h1 className="text-2xl font-semibold mb-6">
          Detalle de Solicitud
        </h1>

        {/* Información */}
        <div className="space-y-3 text-base">
          <p>
            <span className="font-semibold">Nombre:</span>{" "}
            {request.name}
          </p>

          <p>
            <span className="font-semibold">Descripción:</span>{" "}
            {request.description}
          </p>

          <p>
            <span className="font-semibold">Categoría:</span>{" "}
            {request.category}
          </p>

          <p>
            <span className="font-semibold">Ubicación:</span>{" "}
            {request.location}
          </p>

          <p>
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`inline-block rounded-full px-3 py-1 text-sm font-medium
                ${
                  request.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }
              `}
            >
              {request.status}
            </span>
          </p>
        </div>

        {/* Acciones */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => router.push(`/requests/${id}/edit`)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Editar
          </button>

          <button
            onClick={() => router.push("/requests")}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            Volver
          </button>
        </div>
      </section>
    </main>
  );
}
