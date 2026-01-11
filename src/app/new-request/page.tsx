import NewRequestForm from "@/components/requests/NewRequestForm";

export default function NewRequestPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <div className="flex items-center justify-center w-full">
        <NewRequestForm />
      </div>
    </div>
  );
}
