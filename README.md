# 🗳️ Modelo de K-Nearest Neighbors para determinar la afinidad de votación de un usuario 
## Autores: Duvan Santiago Matallana Jiménez - Laura Estefania Latorre Pachon
### Universidad de Cundinamarca - Grupo 802

Proyecto de **Machine Learning aplicado al análisis de afinidad política mediante el algoritmo K-Nearest Neighbors (KNN)**.  
El objetivo principal es **predecir la afinidad ideológica de un nuevo usuario**, basándose en las respuestas que este proporciona en una encuesta interactiva, con respecto a un conjunto de candidatos previamente definidos.

Este proyecto está compuesto por dos módulos principales:

- **Frontend** → Interfaz web desarrollada con React + Vite. Permite al usuario responder la encuesta, visualizar los candidatos y obtener sus resultados.
- **Backend** → API desarrollada en **FastAPI** que contiene el modelo de Machine Learning (KNN), responsable de procesar los datos y generar la predicción.

Ambos módulos se ejecutan en **contenedores Docker separados** (uno para el frontend y otro para el backend), lo que permite un despliegue modular, reproducible y portable.

---

## 🧩 Estructura del proyecto








---

## ⚙️ Tecnologías utilizadas

### **Frontend**
- ⚛️ React 18 + TypeScript  
- ⚡ Vite  
- 🎨 TailwindCSS + Shadcn/UI  
- 🧭 React Router DOM  
- 🔄 TanStack Query  
- ✅ React Hook Form + Zod  
- 📊 Recharts  
- 🧱 Radix UI Components  

### **Backend**
- 🐍 Python 3.11+  
- 🚀 **FastAPI** (framework de alto rendimiento para APIs)  
- 🧠 **Scikit-learn** (KNN, Random Forest, Logistic Regression)  
- 🧾 Pandas, NumPy  
- 💾 Joblib (serialización del modelo)  
- 📈 Matplotlib  
- ⚙️ tqdm, os, json, warnings  

---

## 🐳 Despliegue con Docker

Este proyecto está completamente preparado para ejecutarse en contenedores Docker mediante **docker-compose**.

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/Lenna888/KNN_voters.git
cd KNN_voters
```

### 2️⃣ Construir las imágenes
```bash
docker-compose build
```
### 3️⃣ Ejecutar los contenedores
```bash
docker-compose up
```

### 4️⃣ Acceder a la aplicación


## Instalación Manual (Sin Dcoker)
### Frontend 
```bash
cd Frontend
npm install
npm run dev
```

### Backend
```bash
cd Backend
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```



## 📦 Dependencias principales
### Frontend

Consulta el archivo Frontend/package.json
 para ver todas las dependencias.

## Dependencias destacadas:
`react`, `react-dom`, `vite`, `typescript`
`tailwindcss`, `shadcn/ui`, `lucide-react`
`react-router-dom`, `zod`, `react-hook-form`, `@tanstack/react-query`
`@radix-ui/react-*`, `recharts`

### Backend
Contenido sugerido del Backend/requirements.txt:



