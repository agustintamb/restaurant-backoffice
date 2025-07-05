# 🍽️ Bodegón Argentino - Backoffice

Sistema de gestión y administración para el restaurante **Bodegón Argentino**. Una aplicación web desarrollada con React, TypeScript y Vite que permite administrar todos los aspectos del restaurante desde un panel de control intuitivo.

## ✨ Características

- **Dashboard principal** con estadísticas y resumen del restaurante
- **Gestión de platos** - Crear, editar y administrar el menú
- **Categorías y subcategorías** - Organizar el menú de forma estructurada
- **Ingredientes y alérgenos** - Control completo de componentes de los platos
- **Gestión de usuarios** - Administrar el personal del restaurante
- **Sistema de contacto** - Gestionar mensajes y consultas
- **Autenticación** - Sistema de login seguro
- **Interfaz responsive** - Funciona en desktop y móviles

## 🛠️ Tecnologías

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y servidor de desarrollo
- **Redux Toolkit** - Gestión de estado
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Framer Motion** - Animaciones
- **Axios** - Cliente HTTP
- **Formik & Yup** - Formularios y validaciones

## 🚀 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd restaurant-backoffice
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_BASE_URL=http://localhost:5174
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5174`

## 📝 Scripts disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
```

## 📂 Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables
├── features/      # Gestión de estado (Redux slices)
├── pages/         # Páginas principales
├── layouts/       # Layouts de la aplicación
├── hooks/         # Custom hooks
├── interfaces/    # Tipos TypeScript
├── service/       # Servicios API
├── utils/         # Utilidades y constantes
└── routes/        # Configuración de rutas
```

## 🎯 Módulos principales

### Dashboard

Panel principal con estadísticas generales del restaurante y acceso rápido a todas las secciones.

### Gestión de Platos

- Crear y editar platos del menú
- Asignar categorías, subcategorías, ingredientes y alérgenos
- Subir imágenes de los platos
- Gestionar precios y descripciones

### Categorías y Subcategorías

- Organizar el menú de forma jerárquica
- Crear, editar y eliminar categorías
- Gestionar subcategorías asociadas

### Ingredientes y Alérgenos

- Mantener un catálogo completo de ingredientes
- Gestionar información de alérgenos
- Asociar ingredientes y alérgenos a los platos

### Usuarios

- Gestionar usuarios del sistema
- Información de perfil

## 🔐 Autenticación

El sistema incluye un sistema de autenticación completo con:

- Login seguro
- Rutas protegidas
- Gestión de sesiones
- Perfiles de usuario
