// src/pages/new-request.js

import { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/layout/MainLayout";
import { RequestsService } from "@/services/requests.service";
import RequestForm from "@/components/requests/RequestForm";

export default function NewRequest() {

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleCreate = async (data) => {
    setError(null);
    setMessage(null);
    setLoading(true);

    const { error } = await RequestsService.create(data);

    setLoading(false);

    if (error) {
      setError("No se pudo crear la solicitud.");
      return;
    }

    setMessage("Solicitud creada correctamente ✨");
    setTimeout(() => router.push("/requests"), 900);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center w-full px-4">
        <div className="w-full max-w-3xl">

          <RequestForm
            title="Crear nueva solicitud"
            subtitle="Registra una necesidad o solicitud comunitaria"
            submitLabel="Crear solicitud"
            loading={loading}
            error={error}
            message={message}
            onSubmit={handleCreate}
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </MainLayout>
  );
}
