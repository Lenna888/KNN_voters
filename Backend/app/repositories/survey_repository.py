from sqlalchemy.orm import Session
from app.models.survey_response import PredictionRecord

class SurveyRepository:
    def create_prediction(self, db: Session, input_data: dict, candidate: str, confidence: float) -> PredictionRecord:
        """
        Crea un registro en la base de datos.
        No maneja excepciones, eso es responsabilidad del Servicio.
        """
        db_record = PredictionRecord(
            input_data=input_data,
            predicted_candidate=candidate,
            confidence=confidence
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        return db_record

survey_repo = SurveyRepository()