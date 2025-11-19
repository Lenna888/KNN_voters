import joblib
import json
import sys
import os
import numpy as np
import pandas as pd
import app.ml.definitions as defs
sys.modules['__main__'] = defs

class ModelLoader:
    def __init__(self):
        self.preprocessor = None
        self.feature_selector = None
        self.lr_model = None
        self.knn_model = None
        self.metadata = {}
        self.target_map = {}
        self.assets_path = os.path.join(os.path.dirname(__file__), "assets")
        self.numerical_features = []
        self.ordinal_features = []
        self.all_features = []

    def load_models(self):
        print("🔄 Cargando modelos ML desde:", self.assets_path)
        try:
            self.preprocessor = joblib.load(os.path.join(self.assets_path, "data_preprocessor.joblib"))
            self.feature_selector = joblib.load(os.path.join(self.assets_path, "feature_selector.joblib"))
            self.lr_model = joblib.load(os.path.join(self.assets_path, "lr_probas_model.joblib"))
            self.knn_model = joblib.load(os.path.join(self.assets_path, "knn_model_final.joblib"))
            
            with open(os.path.join(self.assets_path, "model_metadata.json"), 'r') as f:
                self.metadata = json.load(f)
                
            with open(os.path.join(self.assets_path, "target_map.json"), 'r') as f:
                self.target_map = {int(k): v for k, v in json.load(f).items()}
            
            if hasattr(self.preprocessor, 'numerical_features'):
                self.numerical_features = self.preprocessor.numerical_features
                self.ordinal_features = self.preprocessor.ordinal_features
                self.all_features = self.numerical_features + self.ordinal_features
                print(f"✅ Metadata extraída: {len(self.all_features)} features esperadas.")
            else:
                raise RuntimeError("El preprocesador cargado no tiene la estructura esperada.")

            print("✅ Modelos ML cargados correctamente.")
        except Exception as e:
            print(f"❌ CRITICAL: Error cargando modelos: {e}")

    def predict(self, input_data: dict):
        if not self.knn_model:
            raise RuntimeError("Servicio de IA no disponible (Modelos no cargados).")

        try:
            df = pd.DataFrame([input_data])
            df = df.reindex(columns=self.all_features)
            for col in self.all_features:
                df[col] = pd.to_numeric(df[col], errors='coerce').astype(float)

            processed = self.preprocessor.transform(df)
            lda_features = self.feature_selector.transform(processed)
            lr_probas = self.lr_model.predict_proba(processed)
            final_features_array = np.concatenate([lda_features, lr_probas], axis=1)
            n_cols = final_features_array.shape[1]
            final_df = pd.DataFrame(final_features_array, columns=[f"F_{i+1}" for i in range(n_cols)])
            k_val = int(self.metadata.get('best_k', 5))
            pred_ids, confidences = self.knn_model.predict_proba(final_df, k=k_val)
            winner_idx = int(pred_ids[0])
            confidence = float(confidences[0])
            
            candidate_name = self.target_map.get(winner_idx, f"Candidato {winner_idx}")
            
            return {
                "candidate": candidate_name,
                "confidence": round(confidence, 4)
            }

        except Exception as e:
            print(f"❌ Error en predicción: {e}")
            import traceback
            traceback.print_exc()
            raise RuntimeError(f"Error procesando datos: {str(e)}")

ml_service = ModelLoader()