from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

Base = declarative_base()

engine = None
SessionLocal = None

def init_db():
    """
    Intenta conectar a la BD. Si falla, loguea el error pero NO detiene el programa.
    """
    global engine, SessionLocal
    try:
        #pool_pre_ping=True ayuda a reconectar si la conexión se cae
        engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        Base.metadata.create_all(bind=engine)
        logger.info("Conexión a la base de datos establecida correctamente.")
        return True
    except Exception as e:
        logger.error(f"⚠️ ADVERTENCIA: No se pudo conectar a la BD. El backend funcionará en modo 'Sin Persistencia'. Error: {e}")
        engine = None
        SessionLocal = None
        return False
    
def get_db():
    """
    Dependencia para inyectar la sesión en los endpoints.
    Retorna None si la BD no está disponible.
    """
    if SessionLocal is None:
        yield None
        return
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()