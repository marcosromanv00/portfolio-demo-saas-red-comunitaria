import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RequestsService } from "@/services/requests.service";
import MainLayout from "@/components/layout/MainLayout";
import RequestForm from "@/components/requests/RequestForm";

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
  const handleUpdate = async (data) => {
    setSaving(true);

    const { error } = await RequestsService.update(id, data);

    setSaving(false);

    if (error) {
      setError("Error al guardar los cambios.");
      return;
    }

    router.push(`/requests/${id}`);
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
      <div className="min-vdh-screen flex items-center justify-center w-full px-4">
        <div className="w-full max-w-3xl">
          <RequestForm
            initialData={formData}
            title="Editar solicitud"
            subtitle="Modifica los detalles de la solicitud"
            submitLabel="Guardar cambios"
            loading={saving}
            error={error}
            message={null}
            onSubmit={handleUpdate}
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </MainLayout>
  );
}