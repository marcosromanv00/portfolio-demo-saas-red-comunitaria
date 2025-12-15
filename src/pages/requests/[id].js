// pages/requests/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function RequestDetails() {
  const router = useRouter();

  // Obtenemos el ID de la URL
  const { id } = router.query;

  // Estado para almacenar el registro seleccionado
  const [request, setRequest] = useState(null);

  // Estado de carga para evitar errores cuando todavía no hay datos
  const [loading, setLoading] = useState(true);

  // Estado por si ocurre un error
  const [error, setError] = useState(null);

  /**
   * Función que obtiene un registro específico según su ID.
   * Se ejecuta solo cuando `id` exista (Next.js primero hace render sin parámetros).
   */
  const fetchRequest = async () => {
    try {
      setLoading(true);

      // Realizamos query a Supabase para obtener un único registro
      const { data, error } = await supabase
        .from("community_requests")
        .select("*")
        .eq("id", id)
        .single(); // Hace que devuelva un solo objeto

      if (error) throw error;

      // Guardamos la data en estado
      setRequest(data);
    } catch (err) {
      setError(err.message);
    } finally {
      // Quitamos loading siempre
      setLoading(false);
    }
  };

  // Ejecutamos fetchRequest solo cuando `id` esté disponible
  useEffect(() => {
    if (id) fetchRequest();
  }, [id]);

  // Mientras carga, prevenimos que renderice "request.category"
  if (loading) {
    return <p>Cargando solicitud...</p>;
  }

  // Si ocurrió un error al cargar
  if (error) {
    return <p>Error al cargar la solicitud: {error}</p>;
  }

  // Si request es null (por ejemplo, ID malo)
  if (!request) {
    return <p>No se encontró la solicitud.</p>;
  }

  /**
   * Eliminación del registro actual
   */
  const handleDelete = async () => {
    const { error } = await supabase
      .from("community_requests")
      .delete()
      .eq("id", id);

    if (!error) {
      alert("Solicitud eliminada");
      router.push("/requests");
    } else {
      alert("Error al eliminar: " + error.message);
    }
  };

  return (
    <div>
      <h1>Detalle de Solicitud</h1>

      {/* Ahora request SIEMPRE existe antes de llegar aquí,
          así evitamos el error "Cannot read properties of null" */}
      <p><strong>Nombre:</strong> {request.name}</p>
      <p><strong>Descripción:</strong> {request.description}</p>
      <p><strong>Categoría:</strong> {request.category}</p>
      <p><strong>Ubicación:</strong> {request.location}</p>
      <p><strong>Estado:</strong> {request.status}</p>
      <p><strong>Fecha:</strong> {new Date(request.created_at).toLocaleString()}</p>

      <br/>

      {/* Navegar al formulario de edición */}
      <button onClick={() => router.push(`/requests/${id}/edit`)}>
        Editar
      </button>

      <button onClick={handleDelete} style={{ marginLeft: "10px", color: "red" }}>
        Eliminar
      </button>
    </div>
  );
}
