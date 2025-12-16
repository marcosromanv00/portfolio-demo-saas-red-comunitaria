// src/pages/new-request.js

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../supabaseClient";
import MainLayout from "../components/layout/MainLayout";

export default function NewRequest() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!name || !description || !category || !location) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    const { error: sbError } = await supabase
      .from("community_requests")
      .insert([{ name, description, category, location }]);

    if (sbError) {
      setError("No se pudo crear la solicitud.");
      setLoading(false);
      return;
    }

    setMessage("Solicitud creada correctamente ✨");
    setLoading(false);

    setTimeout(() => router.push("/requests"), 900);
  };

  return (
    <MainLayout>
      <div className="min-vdh-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">

          {/* Card */}
          <div
            className="rounded-xl border p-6 md:p-8 shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                Crear nueva solicitud
              </h1>
              <p className="text-sm opacity-70 mt-1">
                Registra una necesidad o solicitud comunitaria
              </p>
            </div>

            {/* Mensajes */}
            {error && (
              <div
                className="mb-4 rounded-md border px-4 py-2 text-sm"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--danger) 15%, transparent)",
                  borderColor: "var(--danger)",
                  color: "var(--danger)",
                }}
              >
                ❌ {error}
              </div>
            )}

            {message && (
              <div
                className="mb-4 rounded-md border px-4 py-2 text-sm"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--success) 15%, transparent)",
                  borderColor: "var(--success)",
                  color: "var(--success)",
                }}
              >
                ✅ {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                ["Nombre", name, setName, "Ej: Asociación Amigos de Alajuela"],
                ["Descripción", description, setDescription, "Describe la necesidad", true],
                ["Categoría", category, setCategory, "Salud, Educación…"],
                ["Ubicación", location, setLocation, "Alajuela Centro"],
              ].map(([label, value, setter, placeholder, textarea], i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  {textarea ? (
                    <textarea
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      rows={4}
                      placeholder={placeholder}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--border)" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2"
                      style={{ borderColor: "var(--border)" }}
                    />
                  )}
                </div>
              ))}

              {/* Actions */}
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
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60 transition"
                >
                  {loading ? "Guardando..." : "Crear solicitud"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
