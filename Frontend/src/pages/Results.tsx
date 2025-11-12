import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Home, RotateCcw, Users } from "lucide-react";

// 1. Importa tu lista de candidatos (asegúrate que la ruta sea correcta)
import { candidates, Candidate } from "@/data/candidates";

// 2. Importa tu mapeador
import { mapAnswersForBackend, RawSurveyAnswers } from "@/survey/survey-mapper";

const Results = () => {
  const navigate = useNavigate();
  const [topCandidate, setTopCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función asíncrona autoejecutable para manejar la lógica
    const fetchPrediction = async () => {
      const answersString = localStorage.getItem("surveyAnswers");
      if (!answersString) {
        navigate("/survey"); // Redirige si no hay respuestas
        return;
      }

      try {
        // 3. Lee las respuestas CRUDAS (ej: { "gender": "Femenino" })
        const rawAnswers: RawSurveyAnswers = JSON.parse(answersString);

        // 4. Mapea a formato NUMÉRICO (ej: { "gender": 0 })
        const jsonForBackend = mapAnswersForBackend(rawAnswers);
        console.log("Respuestas crudas desde localStorage:", rawAnswers);
        console.log("Respuestas mapeadas para backend:", jsonForBackend);

        console.log("Enviando este JSON al backend:", jsonForBackend);

        // 5. Llama a tu backend de FastAPI
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonForBackend),
        });

        if (!response.ok) {
          throw new Error("Hubo un problema con la respuesta del servidor.");
        }

        const result = await response.json();
        // (El backend devuelve ej: { predicted_candidate_name: "CAND_Electra" })

        console.log("Predicción del backend:", result.predicted_candidate_name);

        // 6. Encuentra el objeto candidato completo usando el nombre
        const foundCandidate = candidates.find(
          (c) => c.name === result.predicted_candidate_name
        );

        if (foundCandidate) {
          setTopCandidate(foundCandidate);
        } else {
          throw new Error(
            "El candidato predicho no se encontró en la lista local."
          );
        }
      } catch (error: any) {
        console.error("Error al obtener la predicción:", error);
        setError(error.message || "No se pudo obtener la predicción.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [navigate]); // navigate es una dependencia de useEffect

  // --- RENDERIZADO ---

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-xl text-muted-foreground animate-pulse">
          Calculando tu candidato ideal...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <p className="text-xl text-destructive mb-4">{error}</p>
        <Button onClick={() => navigate("/survey")}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (!topCandidate) {
    // Esto no debería pasar, pero por si acaso
    return null;
  }

  // Si todo salió bien, muestra el candidato
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ¡Tu Candidato Ideal!
            </h1>
            <p className="text-xl text-muted-foreground">
              Basado en tus respuestas, este es el candidato predicho por
              nuestro modelo.
            </p>
          </div>

          <Card
            className="shadow-elevated mb-8 border-4 animate-slide-in"
            style={{ borderColor: topCandidate.color }}
          >
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: topCandidate.color }}
                >
                  {topCandidate.name.split("_")[1][0]}{" "}
                  {/* Muestra la inicial del nombre */}
                </div>
              </div>
              <CardTitle className="text-4xl mb-3">
                {topCandidate.name}
              </CardTitle>
              <p className="text-2xl text-muted-foreground mb-2">
                {topCandidate.party}
              </p>
              <p
                className="text-3xl font-bold italic mt-4"
                style={{ color: topCandidate.color }}
              >
                "{topCandidate.slogan}"
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <p className="text-xl text-center leading-relaxed">
                {topCandidate.description}
              </p>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
            <Button variant="outline" onClick={() => navigate("/candidates")}>
              <Users className="mr-2 h-4 w-4" />
              Ver todos los candidatos
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("surveyAnswers");
                navigate("/survey");
              }}
              className="bg-gradient-primary"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Realizar encuesta de nuevo{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
