// src/pages/requests.js

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import { RequestsService } from "../services/requests.service";
import {
  ACTION_GROUP,
  ACTION_BUTTON,
  ACTION_BUTTON_DANGER,
} from "@/components/ui/actionStyles";
import { EyeIcon } from "@/components/icons/EyeIcon";
import { EditIcon } from "@/components/icons/EditIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";

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
              <div className="-mt-4 flex justify-end-safe text-sm">

                <div className={ACTION_GROUP}>
                  <Link
                    href={`/requests/${req.id}`}
                    className={ACTION_BUTTON + " rounded-l-sm"}>
                    <EyeIcon className="size-5" />
                  </Link>

                  <Link
                    href={`/requests/${req.id}/edit`}
                    className={ACTION_BUTTON + " border-x border-gray-200"}>
                    <EditIcon className="size-5" />
                  </Link>

                  <button
                    onClick={() => deleteRequest(req.id)}
                    className={ACTION_BUTTON + " " + ACTION_BUTTON_DANGER + " rounded-r-sm"}>
                    <TrashIcon className="size-5" />
                  </button>
                </div>

                {/*}
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
                */}
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
    </MainLayout >
  );
}
