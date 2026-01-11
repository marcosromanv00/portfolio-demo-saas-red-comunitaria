export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row px-4 sm:px-8 mx-auto max-w-7xl">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Red Comunitaria. Hecho con ❤️ para
          la comunidad.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <a
            href="#"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Términos
          </a>
          <a
            href="#"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Privacidad
          </a>
          <a
            href="#"
            className="hover:text-foreground hover:underline underline-offset-4"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
