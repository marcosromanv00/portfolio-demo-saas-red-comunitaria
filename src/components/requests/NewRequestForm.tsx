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
  CardFooter,
} from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

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
      setError("No se pudo crear la solicitud. Inténtalo de nuevo.");
      return;
    }

    setMessage("Solicitud creada correctamente");
    setTimeout(() => router.push("/requests"), 1000);
  };

  return (
    <div className="flex justify-center items-start w-full py-10 px-4">
      <Card className="w-full max-w-lg border-primary/20 shadow-2xl shadow-primary/5 animate-slide-in-up">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crear nueva solicitud</CardTitle>
          <CardDescription>
            Registra una necesidad o solicitud para la comunidad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          {message && (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-500/10 p-3 text-sm text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Título</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej: Reparación del parque central"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                name="category"
                placeholder="Ej: Infraestructura, Salud, Eventos..."
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                name="location"
                placeholder="Ej: Barrio Los Ángeles"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción detallada</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe la situación actual y qué se necesita..."
                value={formData.description}
                onChange={handleChange}
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-full"
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
