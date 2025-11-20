# 🧠 Notebook: Political Recommendation Model

This directory contains the necessary files to understand and reproduce the training of the K-Nearest Neighbors (KNN) model used in the backend API.

## 📄 Contents

| File | Description |
| :--- | :--- |
| **`voter_intentions_3000.csv`** | **The raw dataset used for training, featuring survey responses and target variables.** |
| `Sistema_de_recomendación_politica_KNN.ipynb` | The main Jupyter Notebook detailing the data loading, preprocessing, feature engineering, model training, evaluation, and serialization (saving the model). |
| `sistema_de_recomendación_politica_knn.py` | A clean Python script version of the notebook for easier execution or integration outside the notebook environment. |

## ⚙️ Model Details

The model is a **K-Nearest Neighbors (KNN)** classifier.

* **Goal:** Classify a user's political profile based on their survey responses and match it to a set of predefined candidate profiles.
* **Preprocessing:** The data goes through specific steps including:
    * Feature Selection (using a specific selector saved as `feature_selector.joblib`).
    * One-Hot Encoding and Scaling (handled by the preprocessor pipeline saved as `data_preprocessor.joblib`).
* **Outputs:** The final trained model (`knn_model_final.joblib`) and its required preprocessing artifacts are saved into the `Backend/app/ml/assets/` directory for consumption by the API.
