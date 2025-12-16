// src/pages/requests.js

// ==============================
// IMPORTS
// ==============================

// React + hooks
import { useEffect, useState } from "react";
// Cliente de Supabase
import { supabase } from "../supabaseClient";
// Navegación de Next.js
import Link from "next/link";
// Layout principal
import MainLayout from "../components/layout/MainLayout";


/**
 * Página: /requests
 *
 * Responsabilidad única:
 * - Listar solicitudes comunitarias
 * - Permitir navegación, edición y eliminación
 *
 * Diseño:
 * - Compatible con light / dark mode
 * - Usa variables globales de color
 * - Cards accesibles y legibles
 */
export default function Requests() {
  // ==============================
  // ESTADOS
  // ==============================

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ==============================
  // DATA FETCH
  // ==============================

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("community_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("No se pudo cargar la lista de solicitudes.");
      setLoading(false);
      return;
    }

    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("community_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("No se pudo cargar la lista.");
        setLoading(false);
        return;
      }

      setRequests(data);
      setLoading(false);
    };

    loadRequests(); // Ejecutamos la función dentro del efecto
  }, []);

  // ==============================
  // ACTIONS
  // ==============================

  const deleteRequest = async (id) => {
    const confirmDelete = confirm(
      "¿Seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar la solicitud.");
      return;
    }

    fetchRequests();
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ==========================
          HEADER
         ========================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Solicitudes comunitarias
            </h1>
            <p className="text-sm opacity-70">
              Gestión y seguimiento de solicitudes registradas
            </p>
          </div>

          <Link
            href="/new-request"
            className="
            inline-flex items-center justify-center
            rounded-md px-4 py-2 text-sm font-medium
            bg-blue-600 text-white
            hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-400
            transition
          "
          >
            + Nueva solicitud
          </Link>
        </div>

        {/* ==========================
          ESTADOS
         ========================== */}
        {error && (
          <div className="
          mb-6 rounded-md border border-red-400/40
          bg-red-500/10 p-4 text-red-600
        ">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-center opacity-70">
            Cargando solicitudes...
          </p>
        )}

        {!loading && requests.length === 0 && (
          <p className="text-center opacity-70">
            No hay solicitudes registradas aún.
          </p>
        )}

        {/* ==========================
          GRID
         ========================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="
              rounded-lg border border-black/10 dark:border-white/10
              bg-background p-5
              shadow-sm hover:shadow-md
              transition
            "
            >
              {/* INFO */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {req.name}
                </h2>
                <p className="text-sm opacity-70">{req.category}</p>
                <p className="text-sm opacity-70">{req.location}</p>
              </div>

              {/* STATUS */}
              <div className="mb-4">
                <span className="
                inline-block rounded-full
                bg-black/5 dark:bg-white/10
                px-3 py-1 text-xs font-medium
              ">
                  Estado: {req.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center justify-between text-sm">
                <Link
                  href={`/requests/${req.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>

                <Link
                  href={`/requests/${req.id}/edit`}
                  className="text-green-600 hover:underline"
                >
                  Editar
                </Link>

                <button
                  onClick={() => deleteRequest(req.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ==========================
          FOOTER NAV
         ========================== */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </MainLayout>

  );
}
