from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
from datetime import datetime
from app.core.database import Base

class PredictionRecord(Base):
    __tablename__ = "prediction"

    id = Column(Integer, primary_key=True, index=True)
    input_data = Column(JSON, nullable=False)
    predicted_candidate = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)