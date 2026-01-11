import MainLayout from "@/components/layout/MainLayout";
import NewRequestForm from "@/components/requests/NewRequestForm";

export default function NewRequestPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center w-full px-4">
        <div className="w-full max-w-3xl">
          <NewRequestForm />
        </div>
      </div>
    </MainLayout>
  );
}
