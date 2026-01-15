"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { NewRequest } from "@/types/database.types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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

    // Obtener el ID del usuario actual (anónimo)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError(
        "No se pudo identificar tu sesión. Por favor, recarga la página."
      );
      setLoading(false);
      return;
    }

    const requestData: NewRequest = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      status: "pending",
      user_id: user.id, // Enviamos el ID explícitamente
    };

    const { error } = await supabase
      .from("community_requests")
      .insert([requestData]);

    setLoading(false);

    if (error) {
      setError("No se pudo crear la solicitud. Inténtalo de nuevo.");
      return;
    }

    setMessage("Solicitud creada correctamente");
    setTimeout(() => router.push("/requests"), 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Link
        href="/requests"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors
        -mx-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a solicitudes
      </Link>

      <Card className="glass-effect shadow-xl shadow-primary/5 animate-slide-in-up border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-primary/90">
            Crear nueva solicitud
          </CardTitle>
          <CardDescription>
            Registra una necesidad o solicitud para la comunidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-3 text-sm text-destructive animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 p-3 text-sm text-green-500 animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 group">
              <Label
                htmlFor="name"
                className="group-focus-within:text-primary transition-colors"
              >
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Francisca Carrasco"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 group">
                <Label
                  htmlFor="category"
                  className="group-focus-within:text-primary transition-colors"
                >
                  Categoría
                </Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Ej: Infraestructura"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              <div className="space-y-2 group">
                <Label
                  htmlFor="location"
                  className="group-focus-within:text-primary transition-colors"
                >
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ej: Barrio Centro"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label
                htmlFor="description"
                className="group-focus-within:text-primary transition-colors"
              >
                Descripción detallada
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe la situación actual y qué se necesita..."
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[120px] bg-background/50 backdrop-blur-sm"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-[2] shadow-lg shadow-primary/20 hover:shadow-primary/30"
                isLoading={loading}
                disabled={loading || !!message}
              >
                Crear Solicitud
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
