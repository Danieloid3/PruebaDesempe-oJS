# Project Name

SPA (Single Page Application) built with Vanilla JavaScript, modular architecture, and `json-server` as a development REST API.

## 🚀 Key Features

- Framework-less SPA (Vanilla JavaScript ES Modules).
- Frontend routing based on hash or history API (depending on implementation).
- Views and components decoupled into modules.
- Consumption of `json-server` as a simulated backend.
- Centralized services for data access (fetch / axios).
- `npm` scripts for development and build.
- Structure prepared for scaling and reuse in other projects.

## 📁 Folder Structure (generic)

The structure may vary slightly, but this is the core idea:

- `src/`
    - `index.html`
    - `main.js` → application entry point.
    - `router/` → routing logic (depending on implementation).
    - `views/` → main views of the SPA (e.g., `home`, `admin`, `login`, etc.).
    - `components/` → reusable components (header, footer, cards, modals, etc.).
    - `services/` → modules that encapsulate `json-server` calls.
    - `styles/` → global and specific styles.
    - `utils/` → reusable helper functions.

- `db.json` → mock database for `json-server`.
- `package.json` → `npm` scripts and dependencies.

## 🛠️ Prerequisites

- Node.js (LTS version recommended).
- `npm` (installed with Node).

Optionally:

- Modern browser (Chrome, Firefox, Edge, etc.).
- Live Server extension or similar if not using a bundler with dev server.

## 📦 Installation

1. Clone the repository:

```bash
git clone <REPO_URL>
cd <PROJECT_NAME>
```

2. Install dependencies:

```bash
npm install
```

## 🗃️ `json-server` Configuration

This project uses `json-server` as a mock REST API for development.

### Typical scripts in `package.json`

Make sure you have something similar:

```json
{
  "scripts": {
    "dev": "vite",                  
    "json-server": "json-server --watch db.json --port 3000",
    "start": "npm-run-all --parallel dev json-server"
  },
  "devDependencies": {
    "json-server": "^0.17.0",
    "npm-run-all": "^4.1.5"
  }
}
```

- `json-server` port: `http://localhost:3000` (can be changed).
- Data file: `db.json`.

### Minimal `db.json` example

```json
{
  "products": [],
  "orders": [],
  "users": []
}
```

Adapt the collections according to your domain (e.g., `tickets`, `posts`, `tasks`, etc.).

## ▶️ How to run the project in development

1. Start frontend and `json-server` in parallel:

```bash
npm start
```

- The frontend will typically be available at `http://localhost:5173` (or the port your dev server uses).
- The `json-server` API will be at `http://localhost:3000`.

You can also run the commands separately:

```bash
npm run dev
npm run json-server
```

## 🧩 SPA Architecture

### 1. Entry Point

- `src/main.js` is responsible for:
    - Initializing the application.
    - Configuring the router (if it exists).
    - Rendering the initial view in the DOM `root`.

### 2. Views (`views`)

Each view is generally a function that:

- Creates and returns an `HTMLElement` node (e.g., a `main` or a `section`).
- Connects events (click, submit, etc.).
- Optionally consumes services to fetch data from `json-server`.

### 3. Components (`components`)

Reusable UI elements such as:

- `Navbar`, `Sidebar`, `Footer`
- `Card`, `Table`, `Modal`
- Generic forms

Each component usually returns a pre-configured `HTMLElement`.

### 4. Services (`services`)

Modules that encapsulate all API access logic. For example:

- `jsonService.js` or resource-specific services.

Typical responsibilities:

- Define a `BASE_URL` (e.g., `http://localhost:3000`).
- Provide CRUD functions: `getAll`, `getById`, `create`, `update`, `remove`.
- Handle errors and return a uniform structure (e.g., `{ success, data, error }`).

### 5. Utilities (`utils`)

- Data normalization.
- Local storage / session storage management.

## 🔧 Build and Deployment (generic)

Depending on the bundler (e.g., Vite):

```bash
npm run build
```

This will generate a `dist/` folder ready to be deployed on any static hosting (Netlify, Vercel, GitHub Pages, etc.).
