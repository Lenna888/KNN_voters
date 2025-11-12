import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { candidates, Candidate } from "@/data/candidates";
import { Home, RotateCcw, Users } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const [topCandidate, setTopCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const answersString = localStorage.getItem("surveyAnswers");
    if (!answersString) {
      navigate("/survey");
      return;
    }

    const answers = JSON.parse(answersString);
    
    // Calcular afinidad con cada candidato
    const scores = candidates.map((candidate) => {
      let totalScore = 0;
      let categories = 0;

      Object.entries(answers).forEach(([category, value]) => {
        const categoryValue = candidate.values[category as keyof typeof candidate.values];
        if (categoryValue !== undefined) {
          // Calcular similitud: 10 - diferencia absoluta
          const similarity = 10 - Math.abs(categoryValue - (value as number));
          totalScore += similarity;
          categories++;
        }
      });

      return {
        candidate,
        score: categories > 0 ? (totalScore / categories) * 10 : 0,
      };
    });

    // Ordenar por puntuación
    scores.sort((a, b) => b.score - a.score);
    
    setTopCandidate(scores[0].candidate);
  }, [navigate]);

  if (!topCandidate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ¡Tu Candidato Ideal!
            </h1>
            <p className="text-xl text-muted-foreground">
              Basado en tus respuestas, este es el candidato más afín a tus valores
            </p>
          </div>

          <Card className="shadow-elevated mb-8 border-4" style={{ borderColor: topCandidate.color }}>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: topCandidate.color }}
                >
                  #{topCandidate.id}
                </div>
              </div>
              <CardTitle className="text-4xl mb-3">{topCandidate.name}</CardTitle>
              <p className="text-2xl text-muted-foreground mb-2">{topCandidate.party}</p>
              <p className="text-3xl font-bold italic mt-4" style={{ color: topCandidate.color }}>
                "{topCandidate.slogan}"
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <p className="text-xl text-center leading-relaxed">{topCandidate.description}</p>
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
              Realizar encuesta de nuevo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
