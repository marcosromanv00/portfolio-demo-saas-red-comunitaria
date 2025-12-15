import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

/**
 * Página de detalle de un Request por ID
 * Aplica:
 * - Single Responsibility
 * - Hooks correctamente declarados
 * - Código seguro y predecible
 */
export default function RequestDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Estado para almacenar el request obtenido
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Función memoizada para obtener el request por ID
   *
   * useCallback garantiza que la función:
   * - No se recree innecesariamente
   * - Sea segura de usar dentro de useEffect
   */
  const fetchRequest = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/requests/${id}`);

      if (!response.ok) {
        throw new Error("No se pudo obtener el request");
      }

      const data = await response.json();
      setRequest(data);
    } catch (err) {
      // Manejo seguro del error
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /**
   * Ejecutamos fetchRequest solo cuando:
   * - El ID esté disponible
   * - La función fetchRequest esté definida correctamente
   */
  useEffect(() => {
    if (id) {
      fetchRequest();
    }
  }, [id, fetchRequest]);

  // Estados de UI claros y seguros
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!request) return <p>No se encontró el request</p>;

  return (
    <section>
      <h1>{request.title}</h1>
      <p>{request.description}</p>
      <p><strong>Categoría:</strong> {request.category}</p>

      <button
        onClick={() => router.push(`/requests/${id}/edit`)}
      >
        Editar
      </button>
    </section>
  );
}
