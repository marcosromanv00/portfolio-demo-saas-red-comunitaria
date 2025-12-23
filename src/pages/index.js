// pages/index.js
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center text-center space-y-6 px-4">

        <h1 className="text-3xl font-bold">
          Plataforma de Solicitudes Comunitarias
        </h1>

        <p className="max-w-2xl mx-auto opacity-80">
          Este sistema permite registrar, visualizar y gestionar solicitudes
          de ayuda comunitaria de forma clara y organizada.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/requests"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Ver solicitudes
          </Link>

          <Link
            href="/new-request"
            className="px-4 py-2 border rounded"
          >
            Crear solicitud
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
