import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Red Comunitaria Demo",
    short_name: "RedComunidad",
    description: "Plataforma de gestión de solicitudes vecinales",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
