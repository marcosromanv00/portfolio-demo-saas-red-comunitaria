// src/pages/requests.js

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import MainLayout from "../components/layout/MainLayout";
import { RequestsService } from "../services/requests.service";
import { FooterNav } from "@/components/ui/footerNav";
import RequestCard from "@/components/requests/RequestCard";


export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);


  const deleteRequest = async (id) => {
    const confirmDelete = confirm(
      "¿Seguro que deseas eliminar esta solicitud? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    const { error } = await RequestsService.remove(id);

    if (error) {
      setError("No se pudo eliminar la solicitud.");
      return;
    }

    fetchRequests();
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
            requests && <RequestCard key={req.id} request={req} onDelete={deleteRequest} />
          ))}
        </div>

        {/* FOOTER NAV */}
        <FooterNav />
      </div>
    </MainLayout >
  );
}
