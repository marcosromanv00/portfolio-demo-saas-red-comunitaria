// components/layout/MainLayout.jsx
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />

      <main className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
}
