# Nombre del Proyecto

SPA (Single Page Application) construida con JavaScript Vanilla, arquitectura modular y `json-server` como API REST de desarrollo.

## 🚀 Características principales

- SPA sin frameworks (JavaScript Vanilla ES Modules).
- Ruteo en el frontend basado en hash o history API (según implementación).
- Vistas y componentes desacoplados en módulos.
- Consumo de `json-server` como backend simulado.
- Servicios centralizados para acceso a datos (fetch / axios).
- Scripts de `npm` para desarrollo y build.
- Estructura preparada para escalar y reutilizar en otros proyectos.

## 📁 Estructura de carpetas (genérica)

La estructura puede variar ligeramente, pero la idea base es esta:

- `src/`
    - `index.html`
    - `main.js` → punto de entrada de la aplicación.
    - `router/` → lógica de enrutamiento (según implementación).
    - `views/` → vistas principales de la SPA (por ejemplo: `home`, `admin`, `login`, etc.).
    - `components/` → componentes reutilizables (header, footer, cards, modales, etc.).
    - `services/` → módulos que encapsulan las llamadas a `json-server`.
    - `styles/` → estilos globales y específicos.
    - `utils/` → funciones de ayuda (helpers) reutilizables.

- `db.json` → base de datos falsa para `json-server`.
- `package.json` → scripts y dependencias de `npm`.

## 🛠️ Requisitos previos

- Node.js (versión LTS recomendada).
- `npm` (se instala junto con Node).

Opcionalmente:

- Navegador moderno (Chrome, Firefox, Edge, etc.).
- Extensión Live Server o similar si no se usa un bundler con dev server.

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias:

```bash
npm install
```

## 🗃️ Configuración de `json-server`

Este proyecto usa `json-server` como API REST falsa para desarrollo.

### Scripts típicos en `package.json`

Asegúrate de tener algo similar:

```json
{
  "scripts": {
    "dev": "vite",                  
    "json-server": "json-server --watch db.json --port 3001",
    "start": "npm-run-all --parallel dev json-server"
  },
  "devDependencies": {
    "json-server": "^0.17.0",
    "npm-run-all": "^4.1.5"
  }
}
```

- Puerto de `json-server`: `http://localhost:3000` (puedes cambiarlo).
- Archivo de datos: `db.json`.

### Ejemplo mínimo de `db.json`

```json
{
  "products": [],
  "orders": [],
  "users": []
}
```

Adapta las colecciones según tu dominio (por ejemplo, `tickets`, `posts`, `tasks`, etc.).

## ▶️ Cómo ejecutar el proyecto en desarrollo

1. Levantar frontend y `json-server` en paralelo:

```bash
npm start
```

- El frontend quedará disponible típicamente en `http://localhost:5173` (o el puerto que use tu dev server).
- La API de `json-server` quedará en `http://localhost:3001`.

También puedes ejecutar los comandos por separado:

```bash
npm run dev
npm run json-server
```

## 🧩 Arquitectura de la SPA

### 1. Punto de entrada

- `src/main.js` se encarga de:
    - Inicializar la aplicación.
    - Configurar el router (si existe).
    - Renderizar la vista inicial en el `root` del DOM.

### 2. Vistas (`views`)

Cada vista generalmente es una función que:

- Crea y devuelve un nodo `HTMLElement` (por ejemplo, un `main` o un `section`).
- Conecta eventos (click, submit, etc.).
- Opcionalmente, consume servicios para obtener datos desde `json-server`.


### 3. Componentes (`components`)

Elementos reutilizables de UI como:

- `Navbar`, `Sidebar`, `Footer`
- `Card`, `Table`, `Modal`
- Formularios genéricos

Cada componente suele devolver un `HTMLElement` ya configurado.

### 4. Servicios (`services`)

Módulos que encapsulan toda la lógica de acceso a la API. Por ejemplo:

- `jsonService.js` o servicios específicos por recurso.

Responsabilidades típicas:

- Definir un `BASE_URL` (por ejemplo, `http://localhost:3000`).
- Proveer funciones CRUD: `getAll`, `getById`, `create`, `update`, `remove`.
- Manejar errores y devolver una estructura uniforme (por ejemplo `{ success, data, error }`).

### 5. Utilidades (`utils`)


- Normalización de datos.
- Manejo de almacenamiento local/session storage.




## 🔧 Build y despliegue (genérico)

Dependiendo del bundler (por ejemplo, Vite):

```bash
npm run build
```

Esto generará una carpeta `dist/` lista para desplegar en cualquier hosting estático (Netlify, Vercel, GitHub Pages, etc.).

