// src/pages/requests.js

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import { RequestsService } from "../services/requests.service";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await RequestsService.getAll();

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

    const { error } = await RequestsService.remove(id);

    if (!error) {
      fetchRequests();
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
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
            className="btn-new-request"
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <article
              key={req.id}
              className=" group flex flex-col justify-between rounded-xl p-5 shadow-sm hover:shadow-md transition
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
                <div className="mt-3 flex flex-col items gap-2 opacity-80">
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
    </MainLayout >
  );
}
