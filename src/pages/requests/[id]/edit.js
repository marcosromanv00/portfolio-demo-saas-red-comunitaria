/**
 * Página: /requests/[id]/edit
 *
 * Responsabilidad única:
 * - Cargar una solicitud por ID
 * - Permitir editarla
 * - Guardar cambios en Supabase
 *
 * Principios aplicados:
 * - SRP (Single Responsibility)
 * - Manejo explícito de loading y error
 * - UI desacoplada de acceso a datos
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function EditRequestPage() {
  const router = useRouter();
  const { id } = router.query;

  // Estado del formulario
  const [formData, setFormData] = useState(null);

  // Estados de control
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  /**
   * Obtiene la solicitud desde Supabase
   * Se ejecuta solo cuando el ID está disponible
   */
  useEffect(() => {
    if (!id) return;

    const fetchRequest = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("community_requests")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setFormData(data);
      } catch (err) {
        setError("No se pudo cargar la solicitud.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  /**
   * Maneja cambios en los inputs
   * Mantiene el estado del formulario sincronizado
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Guarda los cambios en Supabase
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("community_requests")
      .update({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        location: formData.location,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      alert("Error al guardar los cambios");
    } else {
      alert("Solicitud actualizada correctamente");
      router.push(`/requests/${id}`);
    }
  };

  // Estados visuales seguros
  if (loading) return <p>Cargando formulario...</p>;
  if (error) return <p>{error}</p>;
  if (!formData) return <p>No existe esta solicitud.</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>Editar solicitud</h1>

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Categoría</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Ubicación</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
