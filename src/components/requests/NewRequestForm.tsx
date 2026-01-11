"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { NewRequest } from "@/types/database.types";

interface FormData {
  name: string;
  description: string;
  category: string;
  location: string;
}

export default function NewRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const requestData: NewRequest = {
      title: formData.name,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      status: "pending",
    };

    const { error } = await supabase
      .from("community_requests")
      .insert([requestData]);

    setLoading(false);

    if (error) {
      setError("No se pudo crear la solicitud.");
      return;
    }

    setMessage("Solicitud creada correctamente ✨");
    setTimeout(() => router.push("/requests"), 900);
  };

  return (
    <div
      className="rounded-xl border p-6 md:p-8 shadow-sm"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Crear nueva solicitud</h1>
        <p className="text-sm opacity-70 mt-1">
          Registra una necesidad o solicitud comunitaria
        </p>
      </div>

      {/* Messages */}
      {error && (
        <div
          className="mb-4 rounded-md border px-4 py-2 text-sm"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--danger) 15%, transparent)",
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
            backgroundColor:
              "color-mix(in srgb, var(--success) 15%, transparent)",
            borderColor: "var(--success)",
            color: "var(--success)",
          }}
        >
          ✅ {message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <Field label="Nombre">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Asociación Amigos de Alajuela"
            className="input-base"
          />
        </Field>

        {/* Descripción */}
        <Field label="Descripción">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe la necesidad"
            className="input-base"
          />
        </Field>

        {/* Categoría */}
        <Field label="Categoría">
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Salud, Educación…"
            className="input-base"
          />
        </Field>

        {/* Ubicación */}
        <Field label="Ubicación">
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Alajuela Centro"
            className="input-base"
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Guardando…" : "Crear solicitud"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Subcomponent ---------- */

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}
