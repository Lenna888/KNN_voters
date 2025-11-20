# 🎨 Frontend Source Code (`src`)

This directory contains the source code for the user-facing web application. It is a modern single-page application (SPA) built with React and TypeScript.

## 🚀 Technologies

* **Framework:** React
* **Language:** TypeScript
* **Styling/Components:** Utilizes a component library (likely Shadcn UI or similar) for UI elements.
* **State Management:** Standard React hooks and context (or similar).

## 📄 Key Modules

| File/Folder | Description |
| :--- | :--- |
| `pages/` | Contains the main page components (e.g., `SurveyPage.tsx`, `Results.tsx`, `Index.tsx`). |
| `components/` | Reusable UI and application components (e.g., `Survey.tsx`, `CandidateCard.tsx`). |
| `data/` | Static data files, such as the survey questions and candidate profiles. |
| `App.tsx` | Main application router and layout. |
| `config.ts` | Configuration file for API URLs and application constants. |

## 📦 Installation and Run

Since this is a Node.js project, ensure you have dependencies installed (but remember **not** to commit `node_modules`):

1.  **Install:**
    ```bash
    npm install
    # or yarn install
    ```
2.  **Run:**
    ```bash
    npm run dev
    # or yarn dev
