# Backend/Dockerfile (FIXED)

# ETAPA 1: Construcción (Instalación de dependencias)
FROM python:3.11-slim as builder

WORKDIR /app

# Instalar dependencias del sistema operativo
# libpq-dev: necesaria para psycopg2 (postgres)
# build-essential: necesaria para compilar algunas librerías de ciencia de datos
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia los archivos de requerimientos y los instala
COPY requirements.txt .

# 3. Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt


# ETAPA 2: Producción (Ejecución de la app)

FROM python:3.11-slim

WORKDIR /app

# Logs en tiempo real
ENV PYTHONUNBUFFERED=1

# Instalar librerías de sistema para RUNTIME
# libpq5: para conectar a postgres
# libgomp1: INDISPENSABLE para scikit-learn/numpy en imágenes slim
RUN apt-get update && apt-get install -y \
    libpq5 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copiar las librerías de Python compiladas desde la etapa builder
COPY --from=builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/

# Copia el código de la aplicación y los artefactos de ML
COPY ./app /app/app

# Puerto por defecto (FastAPI/Uvicorn)
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]