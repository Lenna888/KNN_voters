from sqlalchemy.orm import Session
from typing import Dict, Any
from app.repositories.survey_repository import survey_repo
from app.ml.model_loader import ml_service

class PredictionService:
    def process_prediction_flow(self, input_data: Dict[str, Any], db: Session | None) -> Dict[str, Any]:
        """
        Orquestación principal:
        1. Llama al modelo ML (si falla, explota y devuelve 500).
        2. Intenta guardar en BD (si falla, se traga el error y sigue).
        """
        
        ml_result = ml_service.predict(input_data)
        candidate = ml_result["candidate"]
        confidence = ml_result["confidence"]
        db_status_msg = "Guardado exitosamente"
        
        if db is None:
            db_status_msg = "Info: Base de datos no disponible (Modo offline)"
            print("⚠️ Service: Omitiendo guardado (BD no disponible)")
        else:
            try:
                survey_repo.create_prediction(
                    db=db, 
                    input_data=input_data, 
                    candidate=candidate, 
                    confidence=confidence
                )
            except Exception as e:
                print(f"❌ Error al guardar en BD: {e}")
                db_status_msg = "Error interno al almacenar información"

        return {
            "candidate": candidate,
            "confidence": confidence,
            "db_status": db_status_msg
        }

# Instancia singleton
prediction_service = PredictionService()