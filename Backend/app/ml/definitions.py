import pandas as pd
import numpy as np
import joblib
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis as LDA
from typing import List, Tuple

class Data_Preprocessor:
    def __init__(self, numerical_features: List[str], ordinal_features: List[str]):
        self.numerical_features = numerical_features
        self.ordinal_features = ordinal_features

        numerical_pipeline = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ])
        ordinal_pipeline = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='constant', fill_value=-1))
        ])
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_pipeline, self.numerical_features),
                ('ord', ordinal_pipeline, self.ordinal_features)
            ],
            remainder='passthrough'
        )
        self.fitted_columns: List[str] = []

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        if not self.fitted_columns:
            if hasattr(self.preprocessor, 'get_feature_names_out'):
                 self.fitted_columns = list(self.preprocessor.get_feature_names_out())
            else:
                 return pd.DataFrame(self.preprocessor.transform(X), index=X.index)
        
        X_processed = self.preprocessor.transform(X)
        return pd.DataFrame(X_processed, columns=self.fitted_columns, index=X.index)

class Feature_Extractor:
    def __init__(self, n_lda_components: int = 10):
        self.n_lda_components = n_lda_components
        self.lda_transformer = LDA(n_components=self.n_lda_components)
        self.is_fitted = False

    def _to_dataframe(self, data: np.ndarray, prefix: str = 'LDA') -> pd.DataFrame:
        n_components = data.shape[1]
        cols = [f"{prefix}_{i+1}" for i in range(n_components)]
        return pd.DataFrame(data, columns=cols)

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        X_lda = self.lda_transformer.transform(X)
        return self._to_dataframe(X_lda)

class Manual_KNN_Classifier:
    def __init__(self):
        self.X_train = None
        self.y_train = None

    def fit(self, X_train: pd.DataFrame, y_train: pd.Series):
        self.X_train = X_train.values
        self.y_train = y_train.values

    def _calculate_similarities_vectorized(self, x_test_point: np.ndarray) -> np.ndarray:
        dot_products = np.dot(self.X_train, x_test_point)
        norm_a = np.linalg.norm(x_test_point)
        norms_b = np.linalg.norm(self.X_train, axis=1)
        denominators = norm_a * norms_b
        scores = np.divide(dot_products, denominators, out=np.zeros_like(dot_products), where=denominators!=0)
        return scores

    def _weighted_vote(self, k_nearest_labels: np.ndarray, k_nearest_similarities: np.ndarray) -> Tuple[int, float]:
        votes = {}
        total_weight = 0
        for label, sim in zip(k_nearest_labels, k_nearest_similarities):
            if sim >= 0.999999: return label, 1.0
            weight = max(0, sim)
            votes[label] = votes.get(label, 0.0) + weight
            total_weight += weight
        
        if total_weight == 0: return k_nearest_labels[0], 0.0
        winner_label = max(votes, key=votes.get)
        confidence = votes[winner_label] / total_weight
        return winner_label, confidence

    def predict_proba(self, X_test: pd.DataFrame, k: int) -> Tuple[np.ndarray, np.ndarray]:
        if self.X_train is None:
            raise RuntimeError("Classifier has not been fitted.")
        
        X_test_np = X_test.values if hasattr(X_test, 'values') else X_test
        predictions = []
        probabilities = []
        UNDECIDED_ID = 0

        for x_test_point in X_test_np:
            similarities = self._calculate_similarities_vectorized(x_test_point)
            all_sorted_indices = np.argsort(similarities)[::-1]
            valid_neighbors_indices = []
            for idx in all_sorted_indices:
                label = self.y_train[idx]
                if label != UNDECIDED_ID:
                    valid_neighbors_indices.append(idx)
                if len(valid_neighbors_indices) == k:
                    break
            if not valid_neighbors_indices:
                valid_neighbors_indices = all_sorted_indices[:k]
            
            k_nearest_indices = np.array(valid_neighbors_indices)
            k_labels = self.y_train[k_nearest_indices]
            k_sims = similarities[k_nearest_indices]
            prediction, confidence = self._weighted_vote(k_labels, k_sims)
            predictions.append(prediction)
            probabilities.append(confidence)

        return np.array(predictions), np.array(probabilities)