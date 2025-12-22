import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RequestsService } from "@/services/requests.service";
import MainLayout from "@/components/layout/MainLayout";

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

        const { data, error } = await RequestsService.getById(id);

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

    const { error } = await RequestsService.update(id, {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: formData.location,
    });

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
  };

  /* ---------- UI ---------- */

  return (
    <MainLayout>
      <div className="min-vdh-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <div
            className="rounded-xl border p-6 md:p-8 shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                Editar solicitud
              </h1>
              <p className="text-sm opacity-70 mt-1">
                Actualiza el registro de la solicitud comunitaria
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--border)" }}
                />
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                  style={{ borderColor: "var(--border)" }}
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
}