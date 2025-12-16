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
 * - UI desacoplada de acceso a datos
 * - Manejo explícito de loading, error y saving
 * - Tailwind como fuente única de estilos
 */

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function EditRequestPage() {
  const router = useRouter();
  const { id } = router.query;

  /* ---------- Estado ---------- */

  // Estado del formulario (se inicializa al cargar el request)
  const [formData, setFormData] = useState(null);

  // Estados de control
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  /**
   * Obtiene la solicitud desde Supabase.
   * Se ejecuta solo cuando el ID está disponible (Next.js render inicial).
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
      } catch {
        setError("No se pudo cargar la solicitud.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  /**
   * Maneja cambios en los inputs.
   * Mantiene el estado del formulario sincronizado.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Guarda los cambios en Supabase.
   * Previene múltiples envíos y maneja errores de forma segura.
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

  /* ---------- Estados visuales ---------- */

  if (loading) {
    return (
      <p className="mt-16 text-center text-lg text-gray-500 dark:text-gray-400">
        Cargando formulario…
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-16 text-center text-lg text-red-600 dark:text-red-400">
        {error}
      </p>
    );
  }

  if (!formData) {
    return (
      <p className="mt-16 text-center text-lg text-red-600">
        No existe esta solicitud.
      </p>
    );
  }

  /* ---------- UI ---------- */

  return (
    <main className="flex justify-center px-4 py-12">
      <section className="w-full max-w-xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6">
          Editar solicitud
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block font-medium mb-1">Categoría</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block font-medium mb-1">Ubicación</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}