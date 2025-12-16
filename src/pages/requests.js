// src/pages/requests.js

// React + hooks
import { useEffect, useState } from "react";
// Cliente de Supabase
import { supabase } from "../supabaseClient";
// Navegación de Next.js
import Link from "next/link";

export default function Requests() {
  // Estados
  const [requests, setRequests] = useState([]); // lista de solicitudes
  const [loading, setLoading] = useState(true); // mientras cargan datos
  const [error, setError] = useState(null); // para mostrar errores

  // Función para cargar la lista desde Supabase
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    // SELECT * FROM community_requests ORDER BY created_at DESC
    const { data, error } = await supabase
      .from("community_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("No se pudo cargar la lista.");
      setLoading(false);
      return;
    }

    setRequests(data);
    setLoading(false);
  };

  // Se ejecuta al montar el componente
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

  /**
   * Eliminar una solicitud por ID
   */
  const deleteRequest = async (id) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta solicitud?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar.");
      return;
    }

    // Volvemos a cargar la lista
    fetchRequests();
  };

  // Render:
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Solicitudes registradas</h1>

      {/* Botón para crear nueva solicitud */}
      <div className="mb-4">
        <Link
          href="/new-request"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Nueva solicitud
        </Link>
      </div>

      {/* Mostrar errores */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Mostrar loader */}
      {loading && <p>Cargando solicitudes...</p>}

      {!loading && requests.length === 0 && (
        <p>No hay solicitudes aún.</p>
      )}

      {/* GRID DE SOLICITUDES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border rounded p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">{req.name}</h2>
            <p className="text-sm text-gray-600">{req.category}</p>
            <p className="text-sm text-gray-600">{req.location}</p>
            <p className="text-sm mt-1">
              <strong>Estado:</strong> {req.status}
            </p>

            {/* BOTONES DE ACCIÓN */}
            <div className="mt-3 flex gap-2">
              {/* Ver detalles */}
              <Link
                href={`/requests/${req.id}`}
                className="text-blue-600 hover:underline"
              >
                Ver
              </Link>

              {/* Editar */}
              <Link
                href={`/requests/${req.id}/edit`}
                className="text-green-600 hover:underline"
              >
                Editar
              </Link>

              {/* Eliminar */}
              <button
                className="text-red-600 hover:underline"
                onClick={() => deleteRequest(req.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enlace para volver al inicio */}
      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
