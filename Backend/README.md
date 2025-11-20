# 💻 Backend Service (FastAPI)

This service provides the API layer for the political recommendation system. It is built using **FastAPI** (Python) for high performance and easy asynchronous operations.

## ✨ Architecture

* **API Framework:** FastAPI
* **Model Integration:** The service loads the pre-trained KNN model (`knn_model_final.joblib`) and its necessary preprocessors.
* **Endpoints:** Handles endpoints for receiving survey data and returning prediction results.
* **Database:** Configured to connect via a core database module (using settings from `app/core/config.py`).

## 🔗 Endpoints

The primary endpoint for predictions is:

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/predict/` | Receives a user's survey response and returns the political recommendation result. |
| `GET` | `/docs` | OpenAPI documentation (Swagger UI). |

## ⚙️ Local Development Setup

### Dependencies

Install all required Python packages using:

```bash
pip install -r requirements.txt
```
Dependencies include: `fastapi`, `uvicorn`, `scikit-learn`, `pydantic`, `python-dotenv`, etc.)

**Running Locally**
1. **Environment:** Create a `.env` file in the root of the Backend folder, based on the provided `.env.example`.

2. **Execution:** Run the Uvicorn server:

```Bash

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
