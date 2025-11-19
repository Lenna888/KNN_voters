import os

class Settings:
    PROJECT_NAME: str = "Political Recomender API"
    VERSION: str = "1.0"
    
    _db_url_env = os.getenv("DATABASE_URL")
    
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "postgres")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "postgres")
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "db")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "political_db")
    
    @property
    def DATABASE_URL(self) -> str:
        if self._db_url_env:
            return self._db_url_env
        
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
settings = Settings()