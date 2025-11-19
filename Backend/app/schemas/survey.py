from pydantic import BaseModel
from typing import Dict, Any, Optional

class SurveyInput(BaseModel):
    answers: Dict[str, Any]
    
    class Config:
        json_schema_extra = {
            "example": {
                "answers": {
                    "age": 28,
                    "gender": 1.0,
                    "education": 3.0,
                    "marital_status": 1.0,

                    "household_size": 4,
                    "has_children": 1.0,
                    "urbanicity": 2.0,
                    "region": 2.0,

                    "employment_status": 0.0,
                    "employment_sector": 1.0,
                    "job_tenure_years": 2,

                    "income_bracket": 2.0,
                    "union_member": 1.0,
                    "public_sector": 2.0,
                    "small_biz_owner": 1.0,

                    "home_owner": 1.0,
                    "owns_car": 1.0,
                    "voted_last": 1.0,

                    "party_id_strength": 4,
                    "trust_media": 3,
                    "tv_news_hours": 1,
                    "social_media_hours": 3,

                    "wa_groups": 2.0,
                    "civic_participation": 1.0
                }
            }
        }
    
class PredictionOutput(BaseModel):
    candidate: str
    confidence: float
    db_status: str