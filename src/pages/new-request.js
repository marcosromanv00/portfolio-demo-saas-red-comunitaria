// src/pages/new-request.js

// Importamos React y hooks que vamos a usar.
import { useState } from "react";
// useRouter nos permite navegar programáticamente dentro de Next.js (Pages Router).
import { useRouter } from "next/router";
// Importamos el cliente de Supabase que creaste en src/supabaseClient.js
import { supabase } from "../supabaseClient";

/**
 * Componente de la página /new-request
 * Aquí definimos el formulario para crear una nueva solicitud (community_request).
 */
export default function NewRequest() {
  // --- Estados locales del componente ---
  // Campos del formulario
  const [name, setName] = useState(""); // nombre de la persona/organización
  const [description, setDescription] = useState(""); // descripción de la solicitud
  const [category, setCategory] = useState(""); // categoría (ej. "Ayuda Social")
  const [location, setLocation] = useState(""); // ubicación (ej. "Alajuela Centro")

  // Estados para controlar UX
  const [loading, setLoading] = useState(false); // true mientras se hace la petición
  const [message, setMessage] = useState(null); // mensaje de éxito o error
  const [error, setError] = useState(null); // mensaje de error específico

  // Hook de Next.js para redirigir después de crear la solicitud
  const router = useRouter();

  /**
   * handleSubmit: función que se ejecuta al enviar el formulario.
   * - valida datos mínimos
   * - llama a supabase.from('community_requests').insert(...)
   * - gestiona estados de loading / message / error
   * - redirige a /requests después de crear con éxito (breve delay)
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevenimos el comportamiento por defecto del form
    setMessage(null);
    setError(null);

    // --- Validaciones simples en cliente ---
    if (!name.trim() || !description.trim() || !category.trim() || !location.trim()) {
      setError("Por favor completa todos los campos antes de enviar.");
      return;
    }

    setLoading(true);

    try {
      // Llamada a Supabase para insertar un nuevo registro.
      // Insertamos un array con un objeto (Supabase acepta arrays para insert múltiple).
      const { data, error: sbError } = await supabase
        .from("community_requests")
        .insert([
          {
            name: name.trim(),
            description: description.trim(),
            category: category.trim(),
            location: location.trim(),
            // status y created_at se manejan por defecto desde la BD,
            // por eso NO los incluimos aquí.
          },
        ])
        .select(); // .select() devuelve el registro insertado (útil para confirmar)

      // Manejo de error devuelto por Supabase
      if (sbError) {
        console.error("Supabase insert error:", sbError);
        setError("No se pudo crear la solicitud: " + sbError.message);
        setLoading(false);
        return;
      }

      // Si llegamos aquí, la inserción fue exitosa.
      setMessage("✅ Solicitud creada correctamente.");
      setLoading(false);

      // Opcional: limpiar formulario
      setName("");
      setDescription("");
      setCategory("");
      setLocation("");

      // Redirigir al listado de solicitudes después de 900ms, para que el usuario
      // pueda leer el mensaje de éxito. Puedes ajustar o eliminar este delay.
      setTimeout(() => {
        router.push("/requests");
      }, 900);
    } catch (err) {
      // Capturamos errores inesperados (network, etc.)
      console.error("Error inesperado:", err);
      setError("Ocurrió un error inesperado. Revisa la consola.");
      setLoading(false);
    }
  };

  // --- Render del formulario ---
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Título */}
      <h1 className="text-2xl font-bold mb-4">Crear nueva solicitud</h1>

      {/* Mensajes de estado */}
      {error && <p className="mb-4 text-red-600">❌ {error}</p>}
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María Gómez o Asociación Amigos"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalla la necesidad, quiénes se benefician, urgencia, etc."
            rows="4"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          {/* Podrías cambiar esto por un select con opciones predefinidas */}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ej: Ayuda Social, Infraestructura, Salud..."
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm font-medium mb-1">Ubicación</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej: Alajuela Centro, Barrio XYZ"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Botón de envío */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Crear solicitud"}
          </button>
        </div>
      </form>

      {/* Nota: puedes añadir enlaces rápidos */}
      <div className="mt-6">
        <a href="/requests" className="text-sm text-blue-600 hover:underline">
          ← Volver a la lista de solicitudes
        </a>
      </div>
    </div>
  );
}
