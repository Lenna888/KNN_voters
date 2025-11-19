import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, RotateCcw, Users } from "lucide-react";
import { candidates } from "@/data/candidates";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. Hook para recibir los datos
  const [topCandidate, setTopCandidate] = useState<((typeof candidates)[number] & { confidence: number }) | null>(null);

  useEffect(() => {
    // LEER EL ESTADO DE LA NAVEGACIÓN
    const state = location.state;

    if (!state || !state.result) {
      // Si alguien entra directo a /results sin hacer la encuesta, lo sacamos
      console.warn("No hay resultados en el estado. Redirigiendo...");
      navigate("/survey");
      return;
    }

    const { candidate, confidence } = state.result;
    const cleanName = candidate.replace("CAND_", "");
    console.log("Nombre limpio para buscar:", cleanName);
    // BUSCAR EL CANDIDATO VISUALMENTE
    const foundCandidate = candidates.find(
      (c) => c.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (foundCandidate) {
      setTopCandidate({ ...foundCandidate, confidence });
    } else {
      console.error(`CRÍTICO: No encontré a "${cleanName}" (Original: ${candidate})`);
      // Fallback opcional si no se encuentra
    }
  }, [navigate, location]);

  // --- RENDERIZADO ---

  if (!topCandidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Procesando resultados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-slide-in">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              ¡Tu Candidato Ideal!
            </h1>
            <p className="text-xl text-muted-foreground">
              Coincidencia del <strong>{(topCandidate.confidence * 100).toFixed(1)}%</strong>
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
                  {topCandidate.name[0]} 
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
                localStorage.removeItem("surveyDraft"); // Limpiamos el borrador
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
