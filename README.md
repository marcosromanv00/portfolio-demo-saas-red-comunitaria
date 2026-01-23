# 🏙️ Red Comunitaria

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una plataforma web moderna para la gestión y visualización de redes comunitarias. Este proyecto demuestra la implementación de un stack **Full-Stack tipo "Flash"** (rápido desarrollo y despliegue) utilizando las tecnologías más robustas del ecosistema React.

## 🚀 Características Principales

*   **CRUD Completo**: Gestión eficiente de datos comunitarios (usuarios, eventos, o recursos).
*   **Base de Datos Relacional**: Modelado de datos complejo con **PostgreSQL** y **Prisma ORM**.
*   **UI Moderna y Responsiva**: Construida con **Tailwind CSS** para un diseño limpio y adaptable a móviles.
*   **Tipo Seguro**: Desarrollo 100% en **TypeScript** para minimizar errores en tiempo de ejecución.
*   **Alto Rendimiento**: Aprovechando el Server-Side Rendering (SSR) y Static Site Generation (SSG) de **Next.js**.

## 📸 Galería

<!-- COMIENZO DE LA GALERÍA -->
<!-- Instrucciones: Sube tus imágenes a una carpeta 'screenshots' o usa un host externo y reemplaza los links abajo -->

<details>
<summary>👀 Ver Capturas de Pantalla</summary>

### Vista Principal
![Dashboard Preview](https://via.placeholder.com/800x450?text=Dashboard+Principal)

### Vista Detalle
![Detail View](https://via.placeholder.com/800x450?text=Vista+de+Detalle)

</details>
<!-- FIN DE LA GALERÍA -->

## 🛠️ Stack Tecnológico

*   **Frontend/Framework**: [Next.js](https://nextjs.org/) (App Router & Server Actions)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **ORM (Base de datos)**: Prisma
*   **Base de Datos**: PostgreSQL
*   **Validación**: Zod (si aplica)

## 🏁 Cómo iniciar localmente

Sigue estos pasos para levantar el proyecto en tu máquina:

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/marcosromanv00/red-comunitaria-demo.git
    cd red-comunitaria-demo
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configurar Variables de Entorno**
    Renombra el archivo `.env.example` a `.env` y rellena las credenciales de tu base de datos PostgreSQL.
    ```bash
    cp .env.example .env
    ```
    *Asegúrate de tener una instancia de PostgreSQL corriendo.*

4.  **Sincronizar Base de Datos (Prisma)**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Correr el Servidor de Desarrollo**
    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
/src
  /app        # Rutas y páginas (Next.js App Router)
  /components # Componentes UI reutilizables
  /lib        # Utilidades y configuración de Prisma Client
/prisma       # Schema.prisma y migraciones
/public       # Assets estáticos
```

## 🤝 Contribución

Este es un proyecto de demostración para portafolio, pero las sugerencias son bienvenidas.

---
Hecho con ❤️ por [Marcos Roman](https://github.com/marcosromanv00)
