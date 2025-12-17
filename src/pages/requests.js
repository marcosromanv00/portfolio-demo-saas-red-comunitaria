// src/pages/requests.js

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("community_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("No se pudo cargar la lista de solicitudes.");
      setLoading(false);
      return;
    }

    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const deleteRequest = async (id) => {
    const confirmDelete = confirm(
      "¿Seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchRequests();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Solicitudes comunitarias
            </h1>
            <p className="text-sm opacity-70 mt-1">
              Gestión y seguimiento de solicitudes registradas
            </p>
          </div>

          <Link
            href="/new-request"
            className="inline-flex items-center justify-center
              rounded-lg px-4 py-2 text-sm font-medium
              bg-blue-600 text-white hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-400
              transition"
          >
            + Nueva solicitud
          </Link>
        </div>

        {/* STATES */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading && (
          <p className="text-center opacity-70">
            Cargando solicitudes…
          </p>
        )}

        {!loading && requests.length === 0 && (
          <p className="text-center opacity-70">
            No hay solicitudes registradas aún.
          </p>
        )}

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <article
              key={req.id}
              className="
                flex flex-col justify-between rounded-xl p-5 shadow-sm hover:shadow-md transition
              "
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              {/* CONTENT */}
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  {req.name}
                </h2>

                <p className="text-sm opacity-70 line-clamp-3">
                  {req.description}
                </p>

                {/* META */}
                <div className="mt-4 flex flex-col gap-2">
                  <span className="badge">
                    🏷️ {req.category}
                  </span>
                  <span className="badge">
                    📍 {req.location}
                  </span>
                  <span className="badge badge-status">
                    ⚙️ {req.status}
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm">
                <Link
                  href={`/requests/${req.id}`}
                  className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700      focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2      dark:focus-visible:ring-offset-zinc-900 transition"
                >
                  Ver solicitud
                </Link>

                <Link
                  href={`/requests/${req.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium text-green-600 dark:text-zinc-300hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 transition"
                >
                  Editar
                </Link>

                <button
                  onClick={() => deleteRequest(req.id)}
                  className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 transition"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* FOOTER NAV */}
        <div className="mt-12">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
