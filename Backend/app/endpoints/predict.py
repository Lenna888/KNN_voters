from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Any
from app.core.database import get_db
from app.schemas.survey import SurveyInput, PredictionOutput
from app.services.prediction_service import prediction_service
from app.models.survey_response import PredictionRecord

router = APIRouter()

@router.post("/predict", response_model=PredictionOutput)
def predict_candidate(payload: SurveyInput, db: Session = Depends(get_db)) -> Any:
    """
    Endpoint principal.
    Delega toda la lógica al PredictionService.
    """
    try:
        result = prediction_service.process_prediction_flow(payload.answers, db)
        return result
        
    except RuntimeError as re:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(re)
        )
    except Exception as e:
        print(f"Unhandled Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error procesando la solicitud."
        )

@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(PredictionRecord).order_by(PredictionRecord.id.desc()).limit(10).all()