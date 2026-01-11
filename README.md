# 🏙️ Red Comunitaria - Sistema de Gestión Vecinal

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-portfolio_ready-green.svg)

**Una plataforma moderna para conectar necesidades barriales con soluciones comunitarias.**

Este proyecto es una demostración técnica de una aplicación web "Full Stack" construida con las últimas tecnologías del ecosistema React. Se enfoca en la experiencia de usuario (UX), el diseño de interfaz (UI) de alta fidelidad y el rendimiento.

## ✨ Características Principales

- **⚡ Arquitectura Moderna**: Construido con **Next.js 15 (App Router)** para renderizado híbrido y optimización SEO.
- **🎨 Diseño Premium**: Sistema de diseño "Glassmorphism" personalizado utilizando **Tailwind CSS v4** y variables CSS nativas.
  - Soporte nativo para **Modo Oscuro/Claro** (`next-themes`).
  - Animaciones fluidas y micro-interacciones.
  - Diseño totalmente responsivo (Mobile First).
- **💾 Backend Serverless**: Integración con **Supabase** para base de datos en tiempo real y almacenamiento.
- **🛡️ TypeScript Puro**: Tipado estricto en toda la aplicación para robustez y mantenibilidad.
- **🔍 SEO Optimizado**: Metadatos dinámicos, Open Graph, Sitemap y Robots.txt generados automáticamente.

## 🛠️ Stack Tecnológico

| Categoría      | Tecnología                                                     |
| :------------- | :------------------------------------------------------------- |
| **Framework**  | [Next.js 15](https://nextjs.org/) (App Router, Server Actions) |
| **Lenguaje**   | [TypeScript](https://www.typescriptlang.org/)                  |
| **Estilos**    | [Tailwind CSS v4](https://tailwindcss.com/)                    |
| **Backend/DB** | [Supabase](https://supabase.com/)                              |
| **Iconos**     | [Lucide React](https://lucide.dev/)                            |
| **Utilidades** | `clsx`, `tailwind-merge`, `cva`                                |

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio**:

    ```bash
    git clone https://github.com/usuario/red-comunitaria-demo.git
    cd red-comunitaria-demo
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env.local` en la raíz basado en `.env.example`:

    ```bash
    NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_anonima
    ```

4.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
src/
├── app/                 # App Router (Páginas y Layouts)
│   ├── new-request/     # Formulario de creación
│   ├── requests/        # Listado y Detalle (Dinámico)
│   ├── layout.tsx       # Layout Root con Providers
│   └── page.tsx         # Landing Page
├── components/
│   ├── layout/          # Header, Footer
│   ├── requests/        # Componentes de negocio (RequestList, ComplaintCard)
│   └── ui/              # Sistema de Diseño (Button, Card, Badge...)
├── lib/                 # Utilidades (supabase client, utils)
└── styles/              # Global CSS (Tailwind imports)
```

## 🧠 Decisiones de Diseño

- **Componentes Compuestos**: Se utilizó el patrón de composición para componentes complejos como `Card` y `NewRequestForm` para maximizar la reutilización.
- **Server vs Client Components**: Se priorizaron los Server Components para el fetching de datos (optimización inicial) y Client Components solo para interactividad necesaria (formularios, listas dinámicas).
- **Estética "Friendly Institutional"**: Se buscó un balance entre la seriedad de una herramienta municipal y la calidez necesaria para fomentar la participación vecinal, usando azules vibrantes y bordes redondeados.

---

Diseñado y Desarrollado por [Tu Nombre] para demostración de capacidades Full Stack.
