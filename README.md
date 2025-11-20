# 🗳️ Modelo de K-Nearest Neighbors para determinar la afinidad de votación de un usuario 

## 👨‍💻 Autores
**Duvan Santiago Matallana Jiménez** | **Laura Estefania Latorre Pachon**
### Universidad de Cundinamarca - Grupo 802

---

## ✨ Resumen del Proyecto

Este proyecto es una solución integral de **Machine Learning aplicado al análisis de afinidad política** que utiliza el algoritmo **K-Nearest Neighbors (KNN)** para la clasificación ideológica.

El objetivo principal es **predecir la afinidad ideológica de un nuevo usuario**, basándose en las respuestas que este proporciona en una encuesta interactiva, y contrastar dicho perfil con un conjunto de candidatos previamente definidos.

El sistema se compone de tres elementos principales diseñados para un despliegue modular y reproducible:

1.  **Frontend (React/Vite):** Interfaz web para la interacción del usuario.
2.  **Backend (FastAPI):** API que aloja el modelo de Machine Learning y gestiona la persistencia de datos.
3.  **Infraestructura (Docker):** Contenerización completa de los servicios de Frontend, Backend y la base de datos **PostgreSQL**.

---

## 🧩 Estructura del Proyecto

El repositorio está organizado en las siguientes carpetas y archivos clave, siguiendo una arquitectura de microservicios y *data-driven*:

| Directorio/Archivo | Descripción | Módulo |
| :--- | :--- | :--- |
| **[`voter_intentions_3000.csv`](#)** | **Dataset de datos brutos** con las intenciones de voto (3000 registros), utilizado para el entrenamiento y evaluación del modelo KNN. | **Datos** |
| **[`Notebook/`](./Notebook/README.md)** | Contiene el código de Ciencia de Datos: **Notebooks Jupyter** (`.ipynb`) y scripts Python (`.py`) para el preprocesamiento, análisis exploratorio, entrenamiento del modelo KNN y serialización de artefactos (`.joblib`). | **Machine Learning** |
| **[`Backend/`](./Backend/README.md)** | La aplicación de **FastAPI** que aloja la lógica del servidor, *endpoints* RESTful de predicción y la capa de repositorio para la base de datos. | **Backend API** |
| `Backend/Dockerfile` | Definición para la construcción de la imagen Docker del servicio de Backend. | **Infraestructura** |
| **`Frontend/`** | Directorio raíz de la aplicación web. Contiene el código fuente en `src/`. | **Frontend UI** |
| `Frontend/Dockerfile` | Definición para la construcción de la imagen Docker del servicio de Frontend. | **Infraestructura** |
| **`docker-compose.yml`** | **Archivo de Orquestación Principal.** Define, configura y conecta los servicios de Frontend, Backend y PostgreSQL. | **Infraestructura** |

---

## ⚙️ Tecnologías Utilizadas

### **Frontend** (React + Vite)

* ⚛️ **React 18 + TypeScript:** Framework base y lenguaje tipado.
* ⚡ **Vite:** Herramienta de construcción y desarrollo rápido.
* 🎨 **TailwindCSS + Shadcn/UI:** Librerías de componentes y utilidades CSS para un diseño limpio.
* 🧭 **React Router DOM:** Gestión de rutas.
* 🔄 **TanStack Query:** Manejo robusto y eficiente del estado asíncrono (fetching de datos de la API).
* ✅ **React Hook Form + Zod:** Manejo de formularios y validación de esquemas.
* 📊 **Recharts** y **Radix UI Components:** Componentes de gráficos y UI de alta calidad.

### **Backend** (Python + FastAPI)

* 🐍 **Python 3.11+:** Lenguaje de programación principal.
* 🚀 **FastAPI:** Framework de alto rendimiento para la API.
* 🧠 **Scikit-learn:** Librería de ML, utilizada para **KNN** y otros modelos experimentales (**Random Forest**, **Logistic Regression**).
* 💾 **Joblib:** Serialización y deserialización del modelo preentrenado.
* 🧾 **Pandas, NumPy:** Herramientas de procesamiento y manipulación de datos.
* 🐘 **SQLAlchemy:** ORM para la interacción con la base de datos **PostgreSQL**.

---

## 🐳 Despliegue con Docker (Recomendado)

El proyecto está configurado para un despliegue completo en contenedores, incluyendo la base de datos.

### Base de Datos

El servicio de persistencia de datos utiliza **PostgreSQL**. Las credenciales de conexión se gestionan a través de variables de entorno definidas en el archivo `.env` (o en `docker-compose.yml`).

### 1️⃣ Clonar el repositorio
```bash
git clone [https://github.com/Lenna888/KNN_voters.git](https://github.com/Lenna888/KNN_voters.git)
cd KNN_voters
```
### 2️⃣ Configurar Entorno
Copie los archivos de ejemplo de entorno y configúrelos. Es esencial definir las variables de conexión a PostgreSQL.

```Bash
# Crear el archivo .env principal basado en el ejemplo del Backend (o Frontend, si aplica)
cp Backend/.env.example .env 
# Asegúrese de definir las variables de entorno para FastAPI y PostgreSQL en este archivo.
```

### 3️⃣ Construir y Ejecutar los Contenedores
Utilizamos el archivo de orquestación docker-compose.yml:

```Bash

# Construir todas las imágenes (Frontend, Backend y PostgreSQL)
docker-compose build

# Ejecutar todos los contenedores en modo detached (segundo plano)
docker-compose up -d
```
### 4️⃣ Acceso a la Aplicación
```
ServicioURL por Defecto
Frontend UI http://localhost:<PUERTO_FRONTEND> (Revisar el docker-compose.yml para el puerto mapeado, típicamente 3000 o 5173).
Backend API Docs (Swagger UI)   http://localhost:<PUERTO_BACKEND>/docs (Revisar el docker-compose.yml para el puerto mapeado, típicamente 8000).
```
---

### 🛠️ Instalación Manual (Sin Docker)

Si prefiere ejecutar los módulos de forma nativa, siga estos pasos:

**Frontend**

```Bash

cd Frontend
npm install       # Instalar dependencias
npm run dev       # Ejecutar servidor de desarrollo
```

**Backend**

```Bash

cd Backend
pip install -r requirements.txt      # Instalar dependencias Python
# Asegúrese de que su base de datos PostgreSQL esté activa y que las variables de entorno (.env) estén configuradas.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

_(**Nota:** La instrucción de ejecución del Backend usa `app.main:app` o `app:app` dependiendo de dónde esté definido el objeto `FastAPI`. Asumimos `app:app` o verificar `uvicorn app.main:app` si el archivo principal es `main.py` dentro de la carpeta `app/`)._

---

### 📦 Dependencias Principales

**Frontend**

Consulta el archivo `Frontend/package.json` para la lista completa de dependencias.

**Backend**

Contenido sugerido del archivo `Backend/requirements.txt`:

```Bash
    # Dependencias de la API
    fastapi
    uvicorn[standard]
    pydantic
    python-dotenv
    # Dependencias de ML/Datos
    scikit-learn
    pandas
    numpy
    joblib
    # Dependencias de la Base de Datos
    psycopg2-binary  # O 'asyncpg' para compatibilidad asíncrona
    sqlalchemy
    alembic
```
