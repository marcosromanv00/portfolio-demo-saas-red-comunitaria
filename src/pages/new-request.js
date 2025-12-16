// src/pages/new-request.js

// React
import { useState } from "react";
// Next.js router
import { useRouter } from "next/router";
// Supabase client
import { supabase } from "../supabaseClient";

/**
 * Página: Crear nueva solicitud
 * Diseño optimizado para claridad, accesibilidad y coherencia visual
 */
export default function NewRequest() {
  // --- Estados del formulario ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // --- Estados UX ---
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  /**
   * Manejo del submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (
      !name.trim() ||
      !description.trim() ||
      !category.trim() ||
      !location.trim()
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const { error: sbError } = await supabase
        .from("community_requests")
        .insert([
          {
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            location: location.trim(),
          },
        ]);

      if (sbError) {
        setError("No se pudo crear la solicitud.");
        setLoading(false);
        return;
      }

      setMessage("Solicitud creada correctamente ✨");
      setLoading(false);

      setTimeout(() => {
        router.push("/requests");
      }, 900);
    } catch (err) {
      setError("Ocurrió un error inesperado.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="rounded-xl border bg-background shadow-sm p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              Crear nueva solicitud
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Registra una necesidad o solicitud comunitaria
            </p>
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:border-red-800">
              ❌ {error}
            </div>
          )}

          {message && (
            <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-700 dark:bg-green-900/20 dark:border-green-800">
              ✅ {message}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Asociación Amigos de Alajuela"
                className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe la necesidad, beneficiarios y contexto"
                className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Grid: Categoría + Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ayuda Social, Salud, Educación..."
                  className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Alajuela Centro"
                  className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5
                           text-sm font-medium text-white hover:bg-blue-700
                           disabled:opacity-60"
              >
                {loading ? "Guardando..." : "Crear solicitud"}
              </button>

              <a
                href="/requests"
                className="text-sm text-blue-600 hover:underline"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
