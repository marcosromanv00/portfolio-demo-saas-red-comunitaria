import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchRequests();
    // Nota: más adelante podemos añadir suscripción en tiempo real
  }, []);

  async function fetchRequests() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("community_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setErrorMsg("Ocurrió un error al obtener los datos.");
        setRequests([]);
      } else {
        setRequests(data || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMsg("Error inesperado al consultar la base de datos.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Solicitudes — Red Comunitaria (Demo)</h1>

      <div className="mb-6">
        <button
          onClick={fetchRequests}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refrescar
        </button>
      </div>

      {loading && <p>Cargando solicitudes...</p>}
      {errorMsg && <p className="text-red-600">Error: {errorMsg}</p>}

      {!loading && requests.length === 0 && (
        <p>No hay solicitudes aún. Puedes crear una desde la app o la consola de Supabase.</p>
      )}

      <ul className="space-y-4">
        {requests.map((r) => (
          <li key={r.id} className="p-4 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{r.name}</h2>
                <p className="text-sm text-gray-600">{r.category} • {r.location}</p>
              </div>
              <span className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</span>
            </div>
            <p className="mt-2">{r.description}</p>
            <div className="mt-3">
              <span className="inline-block px-2 py-1 text-sm rounded bg-gray-100">
                Estado: {r.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}