/**
 * Página: /requests/[id]
 * Muestra y edita una solicitud individual usando el ID de la URL
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function RequestDetail() {
  const router = useRouter();

  // Obtenemos el ID desde la URL: /requests/123
  const { id } = router.query;

  // Estados del componente
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  /**
   * Cargar datos desde Supabase cuando el componente ya tiene el ID disponible
   */
  useEffect(() => {
    if (!id) return; // Evita ejecutar antes de que Next.js envíe el ID

    const fetchRequest = async () => {
      const { data, error } = await supabase
        .from("community_requests")
        .select("*")
        .eq("id", id)
        .single(); // Garantiza un solo registro

      if (error) {
        setMessage("No se encontró la solicitud.");
      } else {
        setRequest(data);
      }

      setLoading(false);
    };

    fetchRequest();
  }, [id]);

  /**
   * Guardar los cambios del formulario en la base de datos
   */
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("community_requests")
      .update({
        name: request.name,
        description: request.description,
        category: request.category,
        location: request.location,
      })
      .eq("id", id);

    if (error) {
      setMessage("❌ Error actualizando: " + error.message);
    } else {
      setMessage("✅ Solicitud actualizada correctamente.");
    }
  };

  // Mientras todavía carga info
  if (loading) return <p style={{ padding: "20px" }}>Cargando...</p>;

  // Si no existe el registro
  if (!request) return <p style={{ padding: "20px" }}>No se encontró la solicitud.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Editar solicitud</h1>

      <form
        onSubmit={handleUpdate}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <label>Nombre</label>
        <input
          value={request.name}
          onChange={(e) => setRequest({ ...request, name: e.target.value })}
        />

        <label>Descripción</label>
        <textarea
          value={request.description}
          onChange={(e) =>
            setRequest({ ...request, description: e.target.value })
          }
        />

        <label>Categoría</label>
        <input
          value={request.category}
          onChange={(e) => setRequest({ ...request, category: e.target.value })}
        />

        <label>Ubicación</label>
        <input
          value={request.location}
          onChange={(e) => setRequest({ ...request, location: e.target.value })}
        />

        <button type="submit" style={{ marginTop: "10px" }}>
          Guardar cambios
        </button>
      </form>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}

      <button
        style={{ marginTop: "20px" }}
        onClick={() => router.push("/requests")}
      >
        Volver
      </button>
    </div>
  );
}
