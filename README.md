# 🏘️ Red Comunitaria Demo

Una plataforma moderna para gestionar solicitudes de ayuda comunitaria. Este proyecto permite a los usuarios crear, visualizar y administrar solicitudes de manera organizada y eficiente.

## ✨ Características

- 📝 **Crear solicitudes** - Formulario intuitivo para registrar nuevas solicitudes de ayuda
- 👀 **Visualizar solicitudes** - Lista completa de todas las solicitudes con detalles
- 🔍 **Ver detalles** - Página individual para cada solicitud con información completa
- 🌓 **Tema claro/oscuro** - Cambio de tema con persistencia en localStorage
- 📱 **Diseño responsive** - Optimizado para dispositivos móviles y desktop
- ⚡ **Rendimiento optimizado** - Construido con Next.js y React 19

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [TailwindCSS 4](https://tailwindcss.com/) + CSS Variables
- **Base de datos**: [Supabase](https://supabase.com/)
- **Tema**: [next-themes](https://github.com/pacocoursey/next-themes)

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ instalado
- Una cuenta de Supabase (gratuita)
- npm, yarn, pnpm o bun

### 1. Clonar el repositorio

```bash
git clone https://github.com/marcosroman00/red-comunitaria-demo.git
cd red-comunitaria-demo
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> **¿Dónde obtengo estas credenciales?**
>
> 1. Ve a [supabase.com](https://supabase.com) y crea un proyecto
> 2. En tu proyecto, ve a Settings → API
> 3. Copia la `URL` y la `anon/public` key

### 4. Configurar la base de datos

Ejecuta este SQL en el editor de Supabase (SQL Editor):

```sql
-- Crear tabla de solicitudes
create table requests (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar Row Level Security
alter table requests enable row level security;

-- Política para permitir lectura pública
create policy "Allow public read access"
  on requests for select
  using (true);

-- Política para permitir inserción pública
create policy "Allow public insert access"
  on requests for insert
  with check (true);
```

### 5. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
red-comunitaria-demo/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Página de inicio
│   │   ├── requests/          # Rutas de solicitudes
│   │   └── new-request/       # Formulario de nueva solicitud
│   ├── components/            # Componentes React
│   │   ├── layout/           # Header, Footer, MainLayout
│   │   ├── ui/               # Componentes UI reutilizables
│   │   ├── requests/         # Componentes de solicitudes
│   │   └── providers/        # Context providers
│   ├── lib/                  # Utilidades y configuración
│   │   └── supabase.ts       # Cliente de Supabase
│   ├── types/                # Tipos TypeScript
│   └── styles/               # Estilos globales
├── public/                   # Archivos estáticos
└── package.json
```

## 🎨 Temas

El proyecto incluye soporte completo para tema claro y oscuro:

- Detección automática de preferencia del sistema
- Toggle manual en el header
- Persistencia en localStorage
- Sin flash de contenido sin estilo (FOUC)

## 🧪 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 📝 Licencia

Este es un proyecto de demostración y práctica. Siéntete libre de usarlo como referencia o base para tus propios proyectos.

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje, pero sugerencias y feedback son bienvenidos.

## 📧 Contacto

- GitHub: [@marcosroman00](https://github.com/marcosroman00)
- Proyecto: [red-comunitaria-demo](https://github.com/marcosroman00/red-comunitaria-demo)

---

**Construido con ❤️ usando Next.js y Supabase**
