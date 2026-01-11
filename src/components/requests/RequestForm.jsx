import { useState, useEffect } from "react";

/**
 * Formulario reutilizable para crear y editar solicitudes.
 * No conoce rutas ni servicios externos.
 */
export default function RequestForm({
    initialData,
    title,
    subtitle,
    submitLabel,
    loading = false,
    error,
    message,
    onSubmit,
    onCancel,
}) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        location: "",
    });

    /* Inicializa datos (modo edición) */
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(formData);
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
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && (
                    <p className="text-sm opacity-70 mt-1">{subtitle}</p>
                )}
            </div>

            {/* Mensajes */}
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
                        onClick={onCancel}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60 transition"
                    >
                        {loading ? "Guardando…" : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ---------- Subcomponente ---------- */

function Field({ label, children }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label}
            </label>
            {children}
        </div>
    );
}
