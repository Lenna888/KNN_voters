from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.database import init_db
from app.ml.model_loader import ml_service
from app.endpoints import predict

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Iniciando Backend...")
    
    ml_service.load_models()
    init_db()
    
    yield
    print("Apagando Backend...")

app = FastAPI(
    title="Political Recommender API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
def health_check():
    from app.core.database import SessionLocal
    db_status = False
    
    if SessionLocal:
        try:
            db = SessionLocal()
            db.execute("SELECT 1")
            db_status = True
            db.close()
        except:
            db_status = False

    return {
        "status": "active",
        "ml_loaded": ml_service.knn_model is not None,
        "database_connected": db_status
    }

app.include_router(predict.router)