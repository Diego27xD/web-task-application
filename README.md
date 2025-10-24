---
# 🖥️ README – Frontend (Task Manager Web)

Interfaz web desarrollada en **React + TypeScript + RSuite** para la gestión de tareas.
Permite registrar usuarios, iniciar sesión, crear, editar y eliminar tareas*.
---

## 🚀 Tecnologías Utilizadas

- **React + TypeScript**
- **RSuite UI Library**
- **Axios**
- **React Router DOM**
- **Zustand** (gestión de estado global)
- **Custom Hooks (useFetch)** para consumo de API

---

## ⚙️ Arquitectura del proyecto: Clean Architecture

src/
├── assets/ # Recursos estáticos (imágenes, íconos, estilos)
│
├── components/ # Componentes UI reutilizables
│ ├── HeaderBar/
│ ├── TaskBoard/
│ ├── TaskCard/
│ ├── TaskModal/
│ └── Common/
│
├── pages/ # Vistas principales de la aplicación
│ ├── LoginPage/
│ ├── RegisterPage/
│ └── HomePage/
│
├── presentation/ # Capa lógica del frontend
│ ├── config/ # Configuración global del proyecto (API base, constantes)
│ ├── hooks/ # Custom hooks (useFetch, etc.)
│ ├── interfaces/ # Tipos e interfaces TypeScript (DTOs, entidades)
│ ├── services/ # Servicios que interactúan con el backend (Axios)
│ └── store/ # Estado global (Zustand)
│
└── util/ # Funciones utilitarias, helpers y manejo de errores

## ⚙️ Configuración del Entorno

1️⃣ Instalar dependencias:

```bash
npm install
```

2️⃣ Crear un archivo .env con la URL del backend:

VITE_API_URL=http://localhost:3000

▶️ Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

🧠 Características Principales

🔐 Login / Registro de usuarios.

💾 Gestión completa de tareas (CRUD).

🧭 Protección de rutas con PrivateRoute y validación de sesión.

⚡ Integración directa con la API REST (Axios + Zustand).

🔄 Hook useFetch reutilizable para cargar catálogos (categorías, prioridades, estatus).

MIT © 2025 – Task Manager WEB
